import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ResumeProvider } from "./contexts/ResumeContexts";
import { EcosystemProvider } from "./contexts/EcosystemContext";
// import { EcosystemProvider } from "./contexts/EcosystemContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes",
  description:
    "Build professional resumes with our modern templates. Easy to edit, live preview, and PDF export.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResumeProvider>
          <EcosystemProvider>
            <Navbar />
            {children}
          </EcosystemProvider>
        </ResumeProvider>
      </body>
    </html>
  );
}
