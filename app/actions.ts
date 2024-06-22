"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const backgroundInfo = "You are Aaryan's AI assistant. You are tasked with answering questions about Formula 1. The question asked after this should be answered in formula 1 terms or give data about formula 1. If the question is not about formula 1, answer it in formula 1 terms. Be funny. Every answer should start with: 'Aaryan's AI assistant: '"

export const generate = async (prompt: string) => {
    const finalPrompt = backgroundInfo + prompt.trim().replace("  ", " ");
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export const getAllMeetings = async () => {
    const response = await fetch("https://api.openf1.org/v1/meetings", { next: { revalidate: 60 * 60 * 24 } })
    const meetings = await response.json();
    return meetings;
}