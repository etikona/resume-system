"use client";

import { Resume } from "../app/types/resume";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resume.template) {
      case "modern":
        return <ModernTemplate resume={resume} />;
      case "classic":
        return <ClassicTemplate resume={resume} />;
      case "minimal":
        return <MinimalTemplate resume={resume} />;

      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto">{renderTemplate()}</div>
    </div>
  );
}
