const dotenv = require('dotenv')
dotenv.config()
const { Groq } = require('groq-sdk');
// const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");



const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function encodeImageToBase64(filePath) {
  const resolvedPath = path.resolve(filePath);
  const ext = path.extname(resolvedPath).toLowerCase();
  
  const mimeMap = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };
  const mimeType = mimeMap[ext] || 'image/jpeg';
  const fileBuffer = fs.readFileSync(resolvedPath);
  return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
}

async function main() {
  const localImagePath = path.join(__dirname, '../../public/sample.jpg');
  const base64ImageUrl = encodeImageToBase64(localImagePath);

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What's in this image? answer in 2 lines max"
          },
          {
            "type": "image_url",
            "image_url": {
              "url": base64ImageUrl
            }
          }
        ]
      }
    ],
    "model": "qwen/qwen3.8-27b",
    "temperature": 1,
    "max_completion_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();









// const client = new GoogleGenAI({});
// const uploadedFile = await client.files.upload({
//   file: "path/to/organ.jpg",
//   config: { mimeType: "image/jpeg" }
// });

// const interaction = await client.interactions.create({
//   model: "gemini-3.8-flash",
//   input: [
//     { type: "text", text: "Caption this image." },
//     {
//       type: "image",
//       uri: uploadedFile.uri,
//       mime_type: uploadedFile.mimeType
//     }
//   ]
// });
// console.log(interaction.output_text);