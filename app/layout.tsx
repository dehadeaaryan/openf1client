import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "F1 Stats",
    description: "Simple F1 Client",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if ('virtualKeyboard' in navigator) {
        (navigator as any).virtualKeyboard.overlaysContent = true;
    }
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
