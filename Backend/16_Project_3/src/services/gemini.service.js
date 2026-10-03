const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY
});

async function generateCaption(file) {
  // Buffer ko seedhe base64 string me convert karein (instant, no file upload delay)
  const base64Image = file.buffer.toString("base64");

  const interaction = await client.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: [
      { type: "text", text: "Caption this image." },
      {
        type: "image",
        data: base64Image,
        mime_type: file.mimetype
      }
    ],
    system_instruction:`
    You are a professional instagram page caption writer. Generate a captivating, witty, and engaging caption for the given image. Highlight the key elements, emotions, and story within the visual narrative. Capture attention, evoke emotion, and inspire interaction. Keep the tone suitable for a broad, dynamic audience. The caption should be creative, polished, and perfect for social media sharing. should be short and concise.use hashtags if needed.
    `
  });

  return interaction.output_text;
}

module.exports = { generateCaption };
