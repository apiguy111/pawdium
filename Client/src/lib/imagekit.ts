// import { upload } from "@imagekit/react";

// const API_URL = import.meta.env["VITE_API_URL"];
// const IMAGEKIT_PUBLIC_KEY =
//     import.meta.env["VITE_IMAGEKIT_PUBLIC_KEY"];

// export const uploadPetImage = async (
//     file: File,
//     onProgress?: (progress: number) => void
// ): Promise<string> => {
//     // 1. Get authentication parameters from backend
//     const authResponse = await fetch(
//         `${API_URL}/api/imagekit/auth`
//     );

//     if (!authResponse.ok) {
//         throw new Error("Failed to authenticate ImageKit upload");
//     }

//     const authData = await authResponse.json();

//     const {
//         token,
//         signature,
//         expire,
//     } = authData.data;

//     // 2. Upload directly from browser to ImageKit
//     const result = await upload({
//         file,
//         fileName: `pet-${Date.now()}-${file.name}`,

//         token,
//         signature,
//         expire,

//         publicKey:
//             IMAGEKIT_PUBLIC_KEY || authData.publicKey,

//         folder: "/pawdium/pets",

//         useUniqueFileName: true,

//         onProgress: (event) => {
//             const progress =
//                 (event.loaded / event.total) * 100;

//             onProgress?.(Math.round(progress));
//         },
//     });

//     return result.url!;
// };


import {
    upload,
    ImageKitInvalidRequestError,
    ImageKitAbortError,
    ImageKitUploadNetworkError,
    ImageKitServerError,
} from "@imagekit/react";

const API_URL = import.meta.env["VITE_API_URL"];

export const uploadPetImage = async (
    file: File,
    onProgress?: (progress: number) => void
): Promise<string> => {
    try {
        console.log("1. Starting ImageKit upload...");
        console.log("File:", file.name, file.type, file.size);

        // --------------------------------
        // 1. Get authentication parameters
        // --------------------------------
        const authResponse = await fetch(
            `${API_URL}/api/imagekit/auth`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(
            "2. Auth response status:",
            authResponse.status
        );

        if (!authResponse.ok) {
            const errorText = await authResponse.text();

            console.error(
                "ImageKit auth request failed:",
                errorText
            );

            throw new Error(
                `ImageKit authentication failed (${authResponse.status}): ${errorText}`
            );
        }

        const authData = await authResponse.json();

        console.log("3. ImageKit auth response:", authData);

        if (!authData.success || !authData.data) {
            throw new Error(
                "Invalid ImageKit authentication response"
            );
        }

        const {
            token,
            signature,
            expire,
            publicKey,
        } = authData.data;

        if (!token || !signature || !expire || !publicKey) {
            console.error("Missing ImageKit auth parameters:", {
                token: !!token,
                signature: !!signature,
                expire: !!expire,
                publicKey: !!publicKey,
            });

            throw new Error(
                "ImageKit authentication parameters are incomplete"
            );
        }

        console.log("4. Auth parameters received successfully");

        // --------------------------------
        // 2. Upload directly to ImageKit
        // --------------------------------
        const result = await upload({
            file,
            fileName: `pet-${Date.now()}-${file.name}`,

            token,
            signature,
            expire,
            publicKey,

            folder: "/pawdium/pets",

            useUniqueFileName: true,

            onProgress: (event) => {
                const progress =
                    (event.loaded / event.total) * 100;

                const roundedProgress = Math.round(progress);

                console.log(
                    `Upload progress: ${roundedProgress}%`
                );

                onProgress?.(roundedProgress);
            },
        });

        console.log("5. ImageKit upload successful:", result);

        if (!result.url) {
            throw new Error(
                "ImageKit upload succeeded but no URL was returned"
            );
        }

        return result.url;
    } catch (error) {
        console.error(
            "========== IMAGEKIT UPLOAD ERROR =========="
        );
        console.error(error);

        if (error instanceof ImageKitInvalidRequestError) {
            console.error(
                "ImageKit invalid request:",
                error.message
            );
        } else if (error instanceof ImageKitAbortError) {
            console.error(
                "ImageKit upload aborted:",
                error.reason
            );
        } else if (
            error instanceof ImageKitUploadNetworkError
        ) {
            console.error(
                "ImageKit network error:",
                error.message
            );
        } else if (
            error instanceof ImageKitServerError
        ) {
            console.error(
                "ImageKit server error:",
                error.message
            );
        }

        console.error(
            "=========================================="
        );

        throw error;
    }
};