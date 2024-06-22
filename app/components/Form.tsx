"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { generate } from "../actions";

export const Form = ({ setOutput }: { setOutput: Dispatch<SetStateAction<string>> }) => {
    const [prompt, setPrompt] = useState("");
    // const [output, setOutput] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        generate(prompt).then((text) => {
            setOutput(text);
        });
    };

    return (
        <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
            <input
                className="bg-white p-2 text-black border-2 border-black rounded-full"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="bg-blue-500 p-2 rounded-2xl" type="submit">Submit</button>
        </form>
    );
}