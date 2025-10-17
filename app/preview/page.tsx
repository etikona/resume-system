"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/components/ResumePreview";
import VerificationBadge from "@/components/VerificationBadge";
import { useResume } from "../contexts/ResumeContexts";
import { ArrowLeft, Download, Edit } from "lucide-react";

export default function PreviewPage() {
  const { currentResume, resumes } = useResume();

  const handleExport = () => {
    if (currentResume) {
      alert(`Exporting ${currentResume.title} as PDF...`);
    }
  };

  if (!currentResume || resumes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Resume Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please create a resume first to preview it.
          </p>
          <Link href="/resume">
            <Button className="bg-secondary hover:bg-secondary/90">
              Create Resume
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/resume">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Resume Preview
                </h1>
                <p className="text-gray-600 text-sm">
                  {currentResume.title} • {currentResume.template} template
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <VerificationBadge status="verified" />
              <Button
                onClick={handleExport}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Link href="/resume">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <ResumePreview resume={currentResume} />
    </div>
  );
}
