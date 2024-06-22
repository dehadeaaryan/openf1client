"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generate = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export const getAllMeetings = async () => {
    const response = await fetch("https://api.openf1.org/v1/meetings", { next: { revalidate: 60 * 60 * 24 } })
    const meetings = await response.json();
    return meetings;
}