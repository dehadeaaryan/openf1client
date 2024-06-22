"use client";

import { Form } from "@/app/components/Form";
import { Output } from "@/app/components/Output";
import { useState } from "react";

export default function Home() {
    const [output, setOutput] = useState("");
    return (
        <div className="p-10 bg-neutral-900 w-screen h-screen flex flex-col justify-center items-center gap-10">
            <p>This website is under construction!</p>
            <Form setOutput={setOutput} />
            <Output output={output} />
        </div>
    );
}
