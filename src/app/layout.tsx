import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import ClaudeProvider from "@/context/claude/claude-provider";
import AppProvider from "@/context/app-context";

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mfon.ai",
  description: "Mfon.ai message generation AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <AppProvider>
          <ClaudeProvider>{children} </ClaudeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
