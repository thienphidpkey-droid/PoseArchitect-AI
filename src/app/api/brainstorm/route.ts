import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from "@google/genai";
import { BrainstormOptions } from "../../../types";
import {
    REALISM_PROMPT,
    NEGATIVE_PROMPT,
    POSE_CATEGORIES,
    MASTER_POSE_CONTEXT,
    CUTE_FACE_INSTRUCTIONS,
    PORTRAIT_POSES,
    PORTRAIT_GAZE,
    PORTRAIT_SKIN_TONES,
    PORTRAIT_HAIR_STYLES,
    PORTRAIT_COLOR_GRADING,
    PORTRAIT_BACKGROUNDS,
    PORTRAIT_MAKEUP,
    GLOBAL_COLOR_RULES
} from "../../../constants";

const API_KEY = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY || "dummy" });

// --- Helper to get prompt from ID in constants ---
const getPromptFromId = (list: any[], id: string) => {
    const item = list.find(x => x.id === id);
    return item ? (item.prompt || item.label) : "";
};

const getLabelFromId = (list: any[], id: string) => {
    const item = list.find(x => x.id === id);
    return item ? item.label : "";
};

// --- Portrait Mode Prompt Builder ---
const constructPortraitPrompt = (options: BrainstormOptions): string => {
    const p = options.portrait;

    // 1. Skin Tone
    const skinPrompt = getPromptFromId(PORTRAIT_SKIN_TONES, p.skinTone);

    // 2. Hair Style
    const hairPrompt = getPromptFromId(PORTRAIT_HAIR_STYLES, p.hairStyle);

    // 3. Color Grading & Global Color Rule
    // Find which group the selected color grading belongs to
    let colorGroup = "neutral";
    let colorPrompt = "";
    for (const [group, items] of Object.entries(PORTRAIT_COLOR_GRADING)) {
        const found = items.find(x => x.id === p.colorGrading);
        if (found) {
            colorGroup = group;
            colorPrompt = found.prompt;
            break;
        }
    }

    // 4. Background & Global Color Logic
    let bgPrompt = "";
    let bgGroup = "";
    for (const [group, items] of Object.entries(PORTRAIT_BACKGROUNDS)) {
        const found = items.find(x => x.id === p.background);
        if (found) {
            bgGroup = group;
            bgPrompt = found.prompt;
            break;
        }
    }

    // Apply Global Color Rules based on Background/Context
    let globalColorRule = "";
    if (bgPrompt.toLowerCase().includes("dark") || bgPrompt.toLowerCase().includes("black")) globalColorRule = GLOBAL_COLOR_RULES.dark;
    else if (bgPrompt.toLowerCase().includes("white")) globalColorRule = GLOBAL_COLOR_RULES.white;
    else if (bgPrompt.toLowerCase().includes("beige") || bgPrompt.toLowerCase().includes("cream")) globalColorRule = GLOBAL_COLOR_RULES.beige;
    else if (bgPrompt.toLowerCase().includes("pastel")) globalColorRule = GLOBAL_COLOR_RULES.pastel;
    else if (bgPrompt.toLowerCase().includes("green") || bgPrompt.toLowerCase().includes("garden")) globalColorRule = GLOBAL_COLOR_RULES.green;
    else if (bgPrompt.toLowerCase().includes("sky") || bgPrompt.toLowerCase().includes("blue")) globalColorRule = GLOBAL_COLOR_RULES.blue_sky;
    else if (bgPrompt.toLowerCase().includes("red")) globalColorRule = GLOBAL_COLOR_RULES.red;
    else if (bgPrompt.toLowerCase().includes("amethyst") || bgPrompt.toLowerCase().includes("purple")) globalColorRule = GLOBAL_COLOR_RULES.purple;
    else globalColorRule = colorPrompt; // Fallback to selected color grading

    // 5. Makeup
    const eyes = getLabelFromId(PORTRAIT_MAKEUP.eyes, p.makeup.eyes);
    const face = getLabelFromId(PORTRAIT_MAKEUP.face, p.makeup.face);
    const lips = getLabelFromId(PORTRAIT_MAKEUP.lips, p.makeup.lips);
    const makeupPrompt = `Makeup: Eyes [${eyes}], Face [${face}], Lips [${lips}]`;

    // 6. Random Poses & Gaze (Passed as list for AI to pick)
    const availablePoses = [
        ...PORTRAIT_POSES.closeUp,
        ...PORTRAIT_POSES.midShot,
        ...PORTRAIT_POSES.fullBody
    ].join(", ");

    const availableGaze = PORTRAIT_GAZE.join(", ");

    return `
    **PORTRAIT MODE SPECIFICATIONS**:
    - **Skin Tone**: ${skinPrompt}
    - **Hair Style**: ${hairPrompt}
    - **Background**: ${bgPrompt}
    - **Global Color Tone**: ${globalColorRule}
    - **Makeup**: ${makeupPrompt}
    
    **INSTRUCTIONS FOR VARIATION**:
    - Randomly select a unique Pose from this list for each concept: [${availablePoses}]
    - Randomly select a unique Gaze from this list for each concept: [${availableGaze}]
    - Ensure the Pose and Gaze match the mood of the generated concept.
    `;
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userPrompt, imageBase64, options } = body;

        if (!API_KEY) {
            return NextResponse.json({ error: "MISSING_API_KEY" }, { status: 500 });
        }

        // 1. Build System Prompt based on Mode
        let systemContext = "";

        if (options.mode === 'portrait') {
            const portraitSpecs = constructPortraitPrompt(options);
            systemContext = `
            You are an expert Portrait Photographer and Art Director.
            ${portraitSpecs}
            
            **STRICT MOOD CONSTRAINT**:
            The mood of the image MUST be one of: [calm, serene, luxurious, modern, expressive, slightly wistful].
            Do NOT use any other mood descriptors.
            `;
        } else if (options.mode === 'business') {
            systemContext = `You are a High-End Corporate Photographer. Focus on professional business profiles.`;
        } else {
            // Creative Mode
            systemContext = `You are an expert Art Director.`;
        }

        // 2. Construct the Final Prompt
        const finalPrompt = `
        ${systemContext}
        
        **USER INPUT**: "${userPrompt}"
        
        **MANDATORY REALISM INSTRUCTIONS**:
        ${REALISM_PROMPT}
        
        **NEGATIVE PROMPT (MUST APPLY)**:
        ${NEGATIVE_PROMPT}
        
        **TASK**:
        Generate 16 distinct, high-quality image concepts based on the specifications above.
        
        **OUTPUT FORMAT**:
        Return a JSON Array of objects with these exact keys:
        - id: string (unique)
        - title: string (Vietnamese format "Cỡ cảnh / Góc máy / Pose")
        - description: string (Short description of the pose and vibe)
        - enhancedPrompt: string (The full, detailed prompt for image generation. MUST start with "[${REALISM_PROMPT}]" followed by the description, then the Negative Prompt at the end.)
        `;

        // 3. Call Gemini
        const modelName = options.useProModel ? "gemini-1.5-pro-001" : "gemini-1.5-flash-001";

        const response = await ai.models.generateContent({
            model: modelName,
            contents: [
                {
                    role: "user",
                    parts: [{ text: finalPrompt }]
                }
            ],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.STRING },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                            enhancedPrompt: { type: Type.STRING }
                        },
                        required: ["id", "title", "description", "enhancedPrompt"]
                    }
                }
            }
        });

        const responseText = response.text;
        if (!responseText) {
            throw new Error("Empty response from Gemini");
        }

        return NextResponse.json(JSON.parse(responseText));

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
