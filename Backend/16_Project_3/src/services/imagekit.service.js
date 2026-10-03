const ImageKit = require("imagekit");

let imagekitClient = null;

function getImageKitClient() {
    if (!imagekitClient) {
        const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
        const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

        if (!publicKey || !privateKey || !urlEndpoint) {
            throw new Error(
                "ImageKit configuration missing: Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in your .env file."
            );
        }

        imagekitClient = new ImageKit({
            publicKey,
            privateKey,
            urlEndpoint
        });
    }

    return imagekitClient;
}

const imagekit = new Proxy({}, {
    get(target, prop) {
        const client = getImageKitClient();
        const value = client[prop];
        return typeof value === "function" ? value.bind(client) : value;
    }
});

async function uploadFile(file) {
    const client = getImageKitClient();
    const response = await client.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname || "image.jpg"}`
    });

    return response;
}

module.exports = {
    imagekit,
    uploadFile
};
