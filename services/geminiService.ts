import { GoogleGenAI, Modality } from "@google/genai";

export type Quality = 'medium' | 'high' | 'ultra' | 'original';

const getPromptForQuality = (quality: Quality): string => {
    switch (quality) {
        case 'medium':
            return `Remove the background from this image quickly. The output must be a PNG with a transparent background. Fast processing is more important than perfect edge detail.`;
        case 'high':
            return `Remove the background from this image. Make the background transparent. The output must be a PNG with a transparent background. Keep the original subject, including all details like hair and fine edges, perfectly intact. Do not add any new elements or change the subject. Just remove the background.`;
        case 'ultra':
            return `Perform an expert-level background removal on this image. The output must be a lossless PNG with a transparent background. Preserve every single detail of the original subject, especially intricate details like individual strands of hair, fur, and complex edges. The cutout should be flawless and of professional studio quality. Ensure there are no halos or artifacts. The original subject's face and features must remain 100% unchanged. Upscale fine details where possible without introducing artifacts.`;
        case 'original':
            return `Perform an expert-level background removal on this image. The output must be a lossless PNG with a transparent background, maintaining the original image's resolution and dimensions exactly. Preserve every single detail of the original subject, especially intricate details like individual strands of hair, fur, and complex edges. The cutout should be flawless and of professional studio quality. Ensure there are no halos or artifacts. The original subject's face and features must remain 100% unchanged. Upscale fine details where possible without introducing artifacts. The goal is maximum data retention; do not apply any compression or resizing that would reduce file size at the cost of quality. The file size should be large if necessary to preserve all details.`;
        default:
            return `Remove the background from this image. Make the background transparent. The output must be a PNG with a transparent background.`;
    }
}


/**
 * Removes the background from an image using the Gemini API.
 * @param base64ImageData The base64 encoded image data (without the data: prefix).
 * @param mimeType The MIME type of the image.
 * @param quality The desired output quality.
 * @returns A promise that resolves to the base64 encoded string of the result image (PNG).
 */
export const removeBackground = async (base64ImageData: string, mimeType: string, quality: Quality): Promise<string> => {
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
      throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const model = 'gemini-2.5-flash-image';
    const prompt = getPromptForQuality(quality);

    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };
    
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });
    
    const candidate = response.candidates?.[0];
    const imagePartResponse = candidate?.content?.parts?.find(part => part.inlineData?.data);

    if (imagePartResponse && imagePartResponse.inlineData) {
        return imagePartResponse.inlineData.data;
    }

    // If no image, check for a reason.
    const blockReason = response.promptFeedback?.blockReason;
    if (blockReason) {
        throw new Error(`Request was blocked: ${blockReason}. Please try a different image.`);
    }
    
    throw new Error("No image data found in the API response.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to remove background: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while processing the image.");
  }
};