import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MD Nawazish Naushad | Full Stack Developer & Bot Architect",
  description:
    "Full Stack Developer specializing in Next.js, Python Automation, TypeScript, and SQL database architectures. Open to internships and global engineering opportunities.",
  keywords: [
    "MD Nawazish Naushad",
    "Nawazish",
    "Full Stack Developer",
    "Python Developer",
    "Bot Architect",
    "Next.js Portfolio",
    "React Engineer",
  ],
  authors: [{ name: "MD Nawazish Naushad" }],
  openGraph: {
    title: "MD Nawazish Naushad | Full Stack Developer",
    description: "Crafting technical structures with creative precision and relentless execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans antialiased bg-[#050709] text-[#eef2f8] selection:bg-[#00f0ff] selection:text-black min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
