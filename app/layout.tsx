import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ResumeProvider } from "./contexts/ResumeContexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeCraft - Build Professional Resumes",
  description:
    "Create beautiful, professional resumes with multiple templates and real-time preview",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
