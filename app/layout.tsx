import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruman",
  description: "Software engineer who designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='overflow-hidden'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e3e3e3]`}
      >
        {children}
      </body>
    </html>
  );
}
