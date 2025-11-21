import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "paste your api key here";
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper to convert file to base64 for Gemini
async function fileToGenerativePart(fileUrl) {
    // In a real app, we'd need the actual File object or Blob.
    // Since we're using data URLs from the FileReader in UploadFlow, we can parse them.
    const base64EncodedDataPromise = new Promise((resolve) => {
        // If it's already a data URL
        if (typeof fileUrl === 'string' && fileUrl.startsWith('data:')) {
            const [meta, data] = fileUrl.split(',');
            const mimeType = meta.match(/:(.*?);/)[1];
            resolve({ inlineData: { data, mimeType } });
        } else {
            // Fallback or error
            resolve(null);
        }
    });
    return base64EncodedDataPromise;
}

const HAIRSTYLE_IMAGES = [
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=80',
    'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=500&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80',
    'https://images.unsplash.com/photo-1595959183082-7bce70848dd8?w=500&q=80',
    'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&q=80',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=80',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&q=80'
];

const OUTFIT_IMAGES = [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'
];

export async function generateHairstyle(images, gender) {
    console.log(`[Gemini API] Generating hairstyles for ${gender}...`);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const imageParts = [];
        if (images.front) imageParts.push(await fileToGenerativePart(images.front));
        if (images.left) imageParts.push(await fileToGenerativePart(images.left));
        if (images.right) imageParts.push(await fileToGenerativePart(images.right));

        const prompt = `Analyze these images of a ${gender}. Suggest 4 distinct hairstyles that would suit their face shape and features. 
    Return a JSON array where each object has:
    - "label": A short creative name for the style (e.g. "Textured Crop", "Wavy Bob").
    - "description": A brief explanation of why it suits them.
    - "style_type": One of ["short", "medium", "long", "buzz", "curly", "straight"].
    
    Output ONLY the JSON.`;

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const suggestions = JSON.parse(jsonStr);

        // Map suggestions to mock images (since we can't generate real ones easily)
        return suggestions.map((style, index) => ({
            id: index + 1,
            label: style.label,
            description: style.description,
            url: HAIRSTYLE_IMAGES[index % HAIRSTYLE_IMAGES.length], // Cycle through mock images
            type: 'hairstyle'
        }));

    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback
        return [
            { id: 1, label: 'Modern Textured', description: 'Suits your face shape.', url: HAIRSTYLE_IMAGES[0] },
            { id: 2, label: 'Classic Fade', description: 'A timeless look.', url: HAIRSTYLE_IMAGES[1] },
            { id: 3, label: 'Side Part', description: 'Professional and clean.', url: HAIRSTYLE_IMAGES[2] },
            { id: 4, label: 'Buzz Cut', description: 'Bold and low maintenance.', url: HAIRSTYLE_IMAGES[3] },
        ];
    }
}

export async function generateOutfit(image, gender) {
    console.log(`[Gemini API] Generating outfits for ${gender}...`);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const imagePart = await fileToGenerativePart(image);

        const prompt = `Analyze this full body image of a ${gender}. Suggest 4 distinct outfit styles that would suit their body type and current fashion trends.
    Return a JSON array where each object has:
    - "label": Name of the look (e.g. "Smart Casual", "Streetwear").
    - "description": Brief description.
    - "products": An array of 2 key items (e.g. [{ "name": "Black Blazer", "brand": "Zara", "price": "$89" }]).
    
    Output ONLY the JSON.`;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const suggestions = JSON.parse(jsonStr);

        return suggestions.map((style, index) => ({
            id: index + 1,
            label: style.label,
            description: style.description,
            url: OUTFIT_IMAGES[index % OUTFIT_IMAGES.length],
            products: style.products.map(p => ({ ...p, link: '#' })),
            type: 'fashion'
        }));

    } catch (error) {
        console.error("Gemini API Error:", error);
        return [
            {
                id: 1,
                label: 'Smart Casual',
                url: OUTFIT_IMAGES[0],
                products: [{ name: 'Blazer', price: '$129', brand: 'Zara', link: '#' }]
            },
            {
                id: 2,
                label: 'Streetwear',
                url: OUTFIT_IMAGES[1],
                products: [{ name: 'Hoodie', price: '$89', brand: 'Nike', link: '#' }]
            },
            {
                id: 3,
                label: 'Formal',
                url: OUTFIT_IMAGES[2],
                products: [{ name: 'Suit', price: '$499', brand: 'SuitSupply', link: '#' }]
            },
            {
                id: 4,
                label: 'Summer Vibes',
                url: OUTFIT_IMAGES[3],
                products: [{ name: 'Linen Shirt', price: '$45', brand: 'H&M', link: '#' }]
            },
        ];
    }
}

export async function editResult(resultId, prompt) {
    // This would ideally call Gemini to refine the text or image
    console.log(`[Gemini API] Editing result ${resultId} with prompt: "${prompt}"`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
}
