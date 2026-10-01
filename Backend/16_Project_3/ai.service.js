const fs = require('node:fs')
const path = require('node:path')
const { GoogleGenAI } = require('@google/genai')
require('dotenv').config()

async function captionImage(imagePath) {
    const apiKey = process.env.GEMINI_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
    if (!apiKey) {
        throw new Error('Set GEMINI_KEY in the environment to use Gemini')
    }

    const client = new GoogleGenAI({ apiKey })
    const uploadedFile = await client.files.upload({
        file: imagePath,
        config: { mimeType: 'image/png' }
    })
    const interaction = await client.interactions.create({
        model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
        input: [
            { type: 'text', text: 'Caption this image in one sentence.' },
            {
                type: 'image',
                uri: uploadedFile.uri,
                mime_type: uploadedFile.mimeType
            }
        ]
    })

    return interaction.output_text
}

module.exports = captionImage

if (require.main === module) {
    const imagePath = path.join(__dirname, 'image.png')
    if (!fs.existsSync(imagePath)) {
        console.error(`Image file not found: ${imagePath}`)
        process.exitCode = 1
    } else {
        captionImage(imagePath)
        .then(caption => console.log(caption))
        .catch(error => {
            console.error('Gemini interaction failed:', error.message)
            process.exitCode = 1
        })
    }
}