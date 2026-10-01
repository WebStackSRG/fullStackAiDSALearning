const { Groq } = require('groq-sdk');
const dotenv = require('dotenv')
dotenv.config()

import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

const uploadedFile = await client.files.upload({
    file: "path/to/organ.jpg",
    config: { mimeType: "image/jpeg" }
});

const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: [
        {type: "text", text: "Caption this image."},
        {
            type: "image",
            uri: uploadedFile.uri,
            mime_type: uploadedFile.mimeType
        }
    ]
});
console.log(interaction.output_text);


async function main() {
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
              "url": "https://imgs.search.brave.com/PaFKneIajBK3Tzh6g5gwCgU2XTovBjOpbjWXGiMVFNw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzU3NTY3MDI5L3Iv/aWwvMDQyOTE5LzY3/MDA1OTkyNDQvaWxf/MzAweDMwMC42NzAw/NTk5MjQ0X2Z0Zmcu/anBn"
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