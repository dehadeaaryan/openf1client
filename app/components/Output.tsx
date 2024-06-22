"use client";

export const Output = ({ output }: { output: string }) => {
    return (
        <div className="bg-white p-4 text-black border-2 border-black rounded-lg h-auto w-full">
            <p>{output}</p>
        </div>
    )
}