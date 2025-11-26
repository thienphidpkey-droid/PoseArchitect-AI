import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
    title: "PoseArchitect AI",
    description: "Brainstorm & generate pose ideas from your references",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
