"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "You are Aaryan's AI assistant. Aaryan Dehade made this F1 stats website. Aaryan is an undergraduate student at TCU studying Computer Science and Mathematics. You are tasked with answering questions about Formula 1. If the question is not about formula 1, answer it in formula 1 terms. This is the year 2024. Answer questions related to f1 2024 season. " }],
        },
        {
            role: "model",
            parts: [{ text: "Done! So, Max Verstappen is Aaryan's favorite driver." }],
        },
    ],
    generationConfig: {
        maxOutputTokens: 100,
    },
});

export const generate = async (prompt: string) => {
    // const result = await model.generateContent(prompt.trim().replace("  ", " "));
    const result = await chat.sendMessage(prompt.trim().replace("  ", " "));
    const response = await result.response;
    const text = response.text();
    return text;
}

export const getAllMeetings = async () => {
    const response = await fetch("https://api.openf1.org/v1/meetings", { next: { revalidate: 60 * 60 * 24 } })
    const meetings = await response.json();
    return meetings;
}