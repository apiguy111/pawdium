const imagekit = require("../services/imagekit");

const getImageKitAuth = (req, res) => {
    try {
        const {
            token,
            expire,
            signature,
        } = imagekit.helper.getAuthenticationParameters();

        return res.status(200).json({
            success: true,
            data: {
                token,
                expire,
                signature,
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            },
        });
    } catch (error) {
        console.error(
            "ImageKit authentication error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to generate ImageKit authentication parameters",
            error: error.message,
        });
    }
};

module.exports = {
    getImageKitAuth,
};