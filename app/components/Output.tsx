"use client";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary"></div>
        </div>
    );
};

export const Output = ({ output, loading }: { output: string, loading: boolean }) => {
    return (
        <div className="bg-neutral-300 p-4 text-neutral-900 border-2 border-black rounded-lg w-full flex-1 flex flex-col justify-end">
            {loading ? <LoadingSpinner /> : <p>{output || "..."}</p>}
        </div>
    )
}