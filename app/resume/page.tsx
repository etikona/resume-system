"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import VerificationBadge from "@/components/VerificationBadge";
import TemplateSelector from "@/components/TemplateSelector";
import { useResume } from "../contexts/ResumeContexts";
import { Eye, Download, Plus, ArrowLeft } from "lucide-react";

export default function ResumeBuilder() {
  const { resumes, currentResume, updateResume, setCurrentResume, addResume } =
    useResume();

  const handleExport = () => {
    if (currentResume) {
      // Mock export functionality
      alert(`Exporting ${currentResume.title} as PDF...`);
    }
  };

  // Auto-create a modern template resume if no resumes exist
  useEffect(() => {
    if (resumes.length === 0) {
      addResume("modern");
    }
  }, [resumes.length, addResume]);

  if (!currentResume) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <TemplateSelector />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Resume Builder
              </h1>
              <p className="text-gray-600">Create and customize your resume</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <VerificationBadge status="verified" />
            <Button
              variant="outline"
              onClick={handleExport}
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Link href="/preview">
              <Button className="bg-secondary hover:bg-secondary/90">
                <Eye className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
            </Link>
            <Button
              onClick={() => addResume("modern")}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          </div>
        </div>

        {/* Resume Selection */}
        {resumes.length > 1 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Resume to Edit:
            </label>
            <select
              value={currentResume.id}
              onChange={(e) => {
                const resume = resumes.find((r) => r.id === e.target.value);
                if (resume) setCurrentResume(resume);
              }}
              className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title} ({resume.template})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <ResumeForm
              resume={currentResume}
              onChange={(updates) => updateResume(currentResume.id, updates)}
            />
          </div>

          {/* Preview Section */}
          <div className="sticky top-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Live Preview
              </h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {currentResume.template} template
              </div>
            </div>
            <div className="max-h-screen overflow-y-auto">
              <ResumePreview resume={currentResume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
