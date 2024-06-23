"use client";

import { Form } from "@/app/components/Form";
import { Output } from "@/app/components/Output";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [prompt, setPrompt] = useState<string[]>([]);
    const [output, setOutput] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    return (
        <div className="p-10 pb-4 bg-background w-full h-full flex flex-col justify-center items-center gap-10 box-border">
            <p className="text-primary">I&apos;m still building this. Check out <Link href="/current" className="underline">the website</Link> or talk to my AI assistant:</p>
            <Output prompt={prompt} output={output} />
            <Form prompt={prompt} setPrompt={setPrompt} output={output} setOutput={setOutput} loading={loading} setLoading={setLoading} />
        </div>
    );
}
