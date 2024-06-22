"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { generate } from "../actions";

export const Form = ({ setOutput, setLoading, loading }: { setOutput: Dispatch<SetStateAction<string>>, setLoading: Dispatch<SetStateAction<boolean>>, loading: boolean }) => {
    const [prompt, setPrompt] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        if (loading) return;
        e.preventDefault();
        setLoading(true);
        try {
            const text = await generate(prompt);
            setOutput(text);
        } catch (error) {
            console.error('Error generating output:', error);
            setOutput('Error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-row gap-4 w-full" onSubmit={handleSubmit}>
            <input
                className="bg-background p-2 text-neutral-200 border-2 border-black w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                placeholder="Ask me anything!"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button disabled={prompt.trim().replace("  ", " ").length === 0 || loading} className="bg-primary p-2 rounded-2xl disabled:bg-neutral-800" type="submit">Submit</button>
        </form>
    );
}