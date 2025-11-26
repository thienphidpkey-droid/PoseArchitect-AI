import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Modality } from '@google/genai';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { concept, referenceImageBase64, useProModel } = body;

        if (!concept || !concept.enhancedPrompt) {
            return NextResponse.json({ error: 'Missing concept data' }, { status: 400 });
        }

        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'MISSING_API_KEY' }, { status: 500 });
        }

        // Retry logic with exponential backoff
        let attempts = 0;
        const maxRetries = 3;

        while (attempts < maxRetries) {
            try {
                const waitTime = attempts === 0 ? 2000 : 5000 * attempts + 2000;
                await sleep(waitTime);

                const ai = new GoogleGenAI({ apiKey });
                const base64Data = referenceImageBase64?.replace(/^data:image\/\w+;base64,/, '');

                // FIX: Use 'imagen-3.0-generate-001' as it is the stable model for this SDK.
                const model = 'imagen-3.0-generate-001';

                const parts: any[] = [{ text: concept.enhancedPrompt }];
                if (base64Data) {
                    parts.unshift({
                        inlineData: { mimeType: 'image/jpeg', data: base64Data }
                    });
                }

                const response = await ai.models.generateContent({
                    model,
                    contents: { parts },
                    config: { responseModalities: [Modality.IMAGE] }
                });

                const imageData = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

                if (imageData) {
                    return NextResponse.json({
                        imageUrl: `data:image/png;base64,${imageData}`
                    });
                } else {
                    return NextResponse.json({ error: 'No image generated' }, { status: 500 });
                }

            } catch (error: any) {
                const status = error?.status;
                const message = error?.message || String(error);

                if (status === 'RESOURCE_EXHAUSTED' || message.includes('RESOURCE_EXHAUSTED')) {
                    return NextResponse.json({ error: 'API Quota Exceeded' }, { status: 429 });
                }

                if (status === 403 || message.includes('PERMISSION_DENIED')) {
                    return NextResponse.json({ error: 'API Key Restricted' }, { status: 403 });
                }

                const isRateLimit = status === 429 || message.includes('429');
                if (isRateLimit && attempts < maxRetries - 1) {
                    console.warn(`Rate limit (429). Retrying ${attempts + 1}/${maxRetries}...`);
                    attempts++;
                    continue;
                }

                console.error(`Gen Image Error (Attempt ${attempts + 1}):`, error);
                return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
            }
        }

        return NextResponse.json({ error: 'Max retries exceeded' }, { status: 500 });

    } catch (error) {
        console.error('Generate Image API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
