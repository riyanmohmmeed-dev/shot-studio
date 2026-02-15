import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Shot Studio — What would you shoot with infinite budget?",
  description:
    "Create stunning, high-aesthetic cinematic frames in seconds. Director-style controls: focal length, aperture, aspect ratio. AI-powered image generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakarta.variable} font-sans antialiased bg-void text-white min-h-screen bg-noise`}>
        {children}
      </body>
    </html>
  );
}
