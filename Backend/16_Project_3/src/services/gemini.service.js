const dotenv = require('dotenv')
dotenv.config()
const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({});
const uploadedFile = await client.files.upload({
  file: "path/to/organ.jpg",
  config: { mimeType: "image/jpeg" }
});

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: [
    { type: "text", text: "Caption this image." },
    {
      type: "image",
      uri: uploadedFile.uri,
      mime_type: uploadedFile.mimeType
    }
  ]
});
console.log(interaction.output_text);