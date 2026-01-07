import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Harshal Vankudre | AI Developer & Business Informatics Student",
  description: "Portfolio of Harshal Vankudre - AI Developer specializing in RAG systems, chatbots, and modern web development. Building intelligent solutions with Python, Next.js, and OpenAI.",
  keywords: ["AI Developer", "Software Engineer", "Portfolio", "Harshal Vankudre", "Machine Learning", "RAG", "Chatbot", "Next.js", "Python"],
  authors: [{ name: "Harshal Vankudre" }],
  openGraph: {
    title: "Harshal Vankudre | AI Developer",
    description: "AI Developer & Business Informatics Student building intelligent systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
