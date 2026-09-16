const { bucket } = require("../config/firebase");
const path = require("path");

const uploadImage = async (file) => {
    if (!file) {
        throw new Error("No image file provided");
    }

    const fileExtension = path.extname(file.originalname);

    const fileName = `pets/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}${fileExtension}`;

    const fileRef = bucket.file(fileName);

    await fileRef.save(file.buffer, {
        metadata: {
            contentType: file.mimetype,
        },
    });

    await fileRef.makePublic();

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return imageUrl;
};

module.exports = {
    uploadImage,
};