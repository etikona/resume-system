"use client";

import { Template } from "../app/types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResume } from "../app/contexts/ResumeContexts";

const templates: {
  id: Template;
  name: string;
  description: string;
  gradient: string;
}[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with bold sections and modern typography",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional format with professional styling",
    gradient: "from-gray-600 to-gray-800",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and clean with maximum readability",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Professional layout for senior positions",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Modern design with creative elements",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function TemplateSelector() {
  const { addResume, resumes } = useResume();

  const handleTemplateSelect = (template: Template) => {
    addResume(template);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose a Template
        </h2>
        <p className="text-gray-600">
          Select a template to start building your resume
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              {/* Template Preview */}
              <div
                className={`h-32 bg-gradient-to-br ${template.gradient} rounded-t-lg flex items-center justify-center`}
              >
                <span className="text-white font-semibold text-lg">
                  {template.name}
                </span>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {template.description}
                </p>
                <Button
                  onClick={() => handleTemplateSelect(template.id)}
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Use This Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {resumes.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Continue Editing</h3>
          <p className="text-blue-700 text-sm">
            You have {resumes.length} resume{resumes.length > 1 ? "s" : ""} in
            progress. Select one from the list above to continue editing.
          </p>
        </div>
      )}
    </div>
  );
}
