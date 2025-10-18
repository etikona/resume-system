"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import VerificationBadge from "@/components/VerificationBadge";
import { useResume } from "../contexts/ResumeContexts";
import {
  Eye,
  Download,
  Plus,
  ArrowLeft,
  FileText,
  Palette,
} from "lucide-react";
import { Template } from "../types/resume";

export default function ResumeBuilder() {
  const { resumes, currentResume, updateResume, setCurrentResume } =
    useResume();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  const handleExport = () => {
    if (currentResume) {
      // Mock export functionality - in production, implement actual PDF export
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in";
      notification.textContent = `Exporting "${currentResume.title}" as PDF...`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  const handleTemplateChange = (newTemplate: Template) => {
    if (currentResume) {
      updateResume(currentResume.id, {
        template: newTemplate,
        title: `${
          newTemplate.charAt(0).toUpperCase() + newTemplate.slice(1)
        } Resume`,
      });
    }
  };

  // Check for resumes and handle redirect
  useEffect(() => {
    if (!hasChecked) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasChecked(true);

        // Only redirect if still no resumes after loading
        if (resumes.length === 0) {
          router.push("/templates");
        }
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [resumes.length, hasChecked, router]);

  // Show loading state while checking for resumes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show empty state if no current resume
  if (!currentResume && resumes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            No Resume Found
          </h2>
          <p className="text-slate-600 mb-4">
            Create a new resume to get started
          </p>
          <Button
            onClick={() => router.push("/templates")}
            className="bg-slate-900 hover:bg-slate-800"
          >
            Choose Template
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="border-slate-300 hover:bg-slate-100 text-slate-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Resume Builder
                </h1>
                <p className="text-sm text-slate-600">
                  Create and customize your professional resume
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <VerificationBadge status="verified" />
              <Button
                variant="outline"
                onClick={handleExport}
                className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button
                className="bg-slate-900 hover:bg-slate-800 text-white transition-colors duration-200"
                onClick={() => router.push("/preview")}
              >
                <Eye className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
              <Button
                onClick={() => router.push("/templates")}
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-slate-100 text-slate-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Resume and Template Selection */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          {/* Resume Selection */}
          {resumes.length > 1 && (
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Resume to Edit:
              </label>
              <select
                value={currentResume?.id || ""}
                onChange={(e) => {
                  const resume = resumes.find((r) => r.id === e.target.value);
                  if (resume) setCurrentResume(resume);
                }}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white text-slate-900 font-medium"
              >
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Template Selection */}
          {currentResume && (
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Change Template:
              </label>
              <select
                value={currentResume.template}
                onChange={(e) =>
                  handleTemplateChange(e.target.value as Template)
                }
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white text-slate-900 font-medium"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="executive">Executive</option>
                <option value="creative">Creative</option>
              </select>
            </div>
          )}
        </div>

        {/* Main Content */}
        {currentResume && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  Resume Information
                </h2>
                <p className="text-sm text-slate-600 mb-4">
                  Fill in your details below. Changes are saved automatically.
                </p>
              </div>
              <ResumeForm
                resume={currentResume}
                onChange={(updates) => updateResume(currentResume.id, updates)}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Live Preview
                    </h2>
                    <p className="text-xs text-slate-600">
                      See your changes in real-time
                    </p>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                    {currentResume.template.charAt(0).toUpperCase() +
                      currentResume.template.slice(1)}{" "}
                    Template
                  </div>
                </div>
                <div className="p-4 bg-slate-100 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="transform scale-90 origin-top">
                    <ResumePreview resume={currentResume} />
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  💡 Pro Tips
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Keep your summary concise (2-3 sentences)</li>
                  <li>• Use action verbs in job descriptions</li>
                  <li>• Quantify achievements with numbers when possible</li>
                  <li>• Proofread everything before exporting</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add some custom CSS for the notification animation */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
