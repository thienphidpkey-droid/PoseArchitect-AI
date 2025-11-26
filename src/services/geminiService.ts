import { BrainstormOptions, PoseConcept } from "../types";

export const brainstormPoses = async (
    userPrompt: string,
    imageBase64: string | undefined,
    options: BrainstormOptions
): Promise<PoseConcept[]> => {
    try {
        const response = await fetch('/api/brainstorm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userPrompt,
                imageBase64,
                options
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Brainstorming failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Brainstorm Service Error:", error);
        throw error;
    }
};

export const generateImageFromPose = async (
    concept: PoseConcept,
    referenceImageBase64: string | undefined,
    useProModel: boolean
): Promise<string | null> => {
    try {
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                concept,
                referenceImageBase64,
                useProModel
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Image generation failed');
        }

        const data = await response.json();
        return data.imageUrl;
    } catch (error) {
        console.error("Generate Image Service Error:", error);
        throw error;
    }
};
