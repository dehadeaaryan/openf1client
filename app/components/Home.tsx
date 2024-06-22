"use client";

import { Form } from "@/app/components/Form";
import { Output } from "@/app/components/Output";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    return (
        <div className="p-10 bg-background w-screen h-full flex flex-col justify-center items-center gap-10 box-border">
            <p className="text-primary">I&apos;m still building this. Check out <Link href="/current" className="underline">the website</Link> or talk to my AI assistant:</p>
            <Output output={output} loading={loading} />
            <Form setOutput={setOutput} loading={loading} setLoading={setLoading} />
        </div>
    );
}
