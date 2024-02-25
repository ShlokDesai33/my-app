import OpenAI from "openai";
import { type Message, OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const intro = [
  "You are an AI Chatbot that always answers questions using the data provided to you.\n",
  "If the answer to the question is not in the data, you simply tell the user that you are unable to answer the question.\n\n",
  "If the question posed to you is unrelated to the data or not a question, simple ask the user to ask about the data."
];

export async function POST(req: Request) {
  const { messages } = await req.json();
  const data = (messages[0] as Message).content;
  const latestMessage = (messages[messages.length - 1] as Message).content;

  let message = intro.join("");
  message += "Data: " + data + "\n\n";
  message +=
    "Using the data given above, answer the following question: " +
    latestMessage;

  const input = [{ content: message, role: "user" }];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: input as any,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
