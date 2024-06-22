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
        <div className="bg-white p-4 text-black border-2 border-black rounded-lg h-auto w-full text-center">
            {loading ? <LoadingSpinner /> : <p>{output || "HI!"}</p>}
        </div>
    )
}