const API_BASE_URL =
    (import.meta.env as Record<string, string>)["VITE_API_URL"] ||
    "http://localhost:5000/api";

/**
 * Always upload via the Express server, which uses Firebase Admin SDK.
 * This avoids all browser ↔ Firebase Storage CORS issues.
 */
export const uploadPetImage = async (
    file: File,
    onProgress?: (progress: number) => void
): Promise<string> => {
    onProgress?.(10);

    const formData = new FormData();
    formData.append("image", file);

    onProgress?.(30);

    const res = await fetch(`${API_BASE_URL}/pets/upload`, {
        method: "POST",
        body: formData,
    });

    onProgress?.(80);

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server upload failed (${res.status}): ${errText}`);
    }

    const data = await res.json();

    onProgress?.(100);

    if (!data.imageUrl) {
        throw new Error("No imageUrl returned from server");
    }

    return data.imageUrl as string;
};