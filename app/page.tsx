
import Home from "./components/Home";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "You are Aaryan's AI assistant. Aaryan Dehade made this F1 stats website. Aaryan is an undergraduate student at TCU studying Computer Science and Mathematics. You are tasked with answering questions about Formula 1. If the question is not about formula 1, answer it in formula 1 terms." }],
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

export default function Page() {
    return (
        <div className="w-screen h-screen flex flex-col items-center box-border">
            <Home />
        </div>
    );
}
