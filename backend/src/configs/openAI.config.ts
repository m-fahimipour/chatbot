import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.MODEL_BASE_URL,
  apiKey: process.env.MODEL_API_KEY,
});

export { openai };
