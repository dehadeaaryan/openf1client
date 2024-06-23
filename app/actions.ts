"use server";
import { model } from "./page";
import { chat } from "./page";

export const generate = async (prompt: string) => {
    const finalPrompt = prompt.trim().replace("  ", " ");
    // const result = await model.generateContent(finalPrompt);
    const result = await chat.sendMessage(finalPrompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export const getAllMeetings = async () => {
    const response = await fetch("https://api.openf1.org/v1/meetings", { next: { revalidate: 60 * 60 * 24 } })
    const meetings = await response.json();
    return meetings;
}