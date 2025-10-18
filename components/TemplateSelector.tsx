"use client";

import { Template } from "../app/types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResume } from "../app/contexts/ResumeContexts";
import {
  FileText,
  Briefcase,
  Minimize2,
  Crown,
  Palette,
  Check,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const templates: {
  id: Template;
  name: string;
  description: string;
  gradient: string;
  icon: any;
  features: string[];
}[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with bold sections and modern typography",
    gradient: "from-slate-900 to-slate-700",
    icon: FileText,
    features: ["Two-column layout", "Bold headers", "Modern styling"],
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional format with professional styling",
    gradient: "from-slate-600 to-slate-800",
    icon: Briefcase,
    features: ["Single column", "Professional", "ATS-friendly"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and clean with maximum readability",
    gradient: "from-slate-500 to-slate-700",
    icon: Minimize2,
    features: ["Minimalist design", "High readability", "Clean spacing"],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Professional layout for senior positions",
    gradient: "from-slate-800 to-slate-950",
    icon: Crown,
    features: ["Executive style", "Senior level", "Sophisticated"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern design with creative elements",
    gradient: "from-slate-700 to-slate-900",
    icon: Palette,
    features: ["Card-based", "Creative flair", "Eye-catching"],
  },
];

export default function TemplateSelector() {
  const { addResume, resumes } = useResume();
  const router = useRouter();

  const handleTemplateSelect = (template: Template) => {
    // Add the resume
    addResume(template);

    // Wait a bit for the context to update, then navigate
    setTimeout(() => {
      router.push("/resume");
    }, 150);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigate("/")}
            className="border-slate-300 hover:bg-slate-100 text-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>5 Professional Templates</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Choose Your Template
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select a template that best represents your professional style and
            career level
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card
                key={template.id}
                className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-slate-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div
                    className={`h-40 bg-gradient-to-br ${template.gradient} flex flex-col items-center justify-center relative overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)",
                        }}
                      ></div>
                    </div>

                    {/* Icon and Name */}
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-white font-bold text-xl">
                        {template.name}
                      </span>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-5">
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 space-y-2">
                      {template.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-slate-600"
                        >
                          <Check className="w-3 h-3 text-slate-900" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-colors duration-200"
                    >
                      Use This Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Editing Section */}
        {resumes.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-slate-900 bg-slate-50 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1 text-lg">
                      Continue Editing
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      You have {resumes.length} resume
                      {resumes.length > 1 ? "s" : ""} in progress. Click below
                      to continue where you left off.
                    </p>
                    <Button
                      onClick={() => handleNavigate("/resume")}
                      variant="outline"
                      className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                    >
                      Go to Resume Builder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-slate-900" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Easy to Edit</h4>
            <p className="text-sm text-slate-600">
              Simple form interface for quick updates
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-slate-900" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Live Preview</h4>
            <p className="text-sm text-slate-600">
              See changes instantly as you type
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-slate-900" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">PDF Export</h4>
            <p className="text-sm text-slate-600">
              Download ready-to-send PDF files
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
