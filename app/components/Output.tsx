"use client";

const ChatBoxes = ({ prompt, output }: { prompt: string, output: string }) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-row items-center justify-end">
                <div className="basis-3/4" />
                <div className={` text-neutral-300 rounded-3xl rounded-br-none bg-primary p-4`}>
                    <p>{prompt}</p>
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-start">
                <div className={`self-start text-neutral-300 rounded-3xl rounded-bl-none bg-neutral-700 p-4`}>
                    <p>{output ?? "..."}</p>
                </div>
                <div className="basis-3/4" />
            </div>
        </div >
    )
}

export const Output = ({ prompt, output }: { prompt: string[], output: string[] }) => {
    return (
        <div className="h-full w-full overflow-hidden box-border">
            <div className="h-full w-full flex flex-col justify-end items-center overflow-y-auto gap-4">
                {prompt.map((text, index) => (
                    <ChatBoxes key={index} prompt={text} output={output[index]} />
                ))}
            </div>
        </div>
    );
}