import { Resume } from "../../app/types/resume";

interface ExecutiveTemplateProps {
  resume: Resume;
}

export default function ExecutiveTemplate({ resume }: ExecutiveTemplateProps) {
  return (
    <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-lg border-t-4 border-secondary">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resume.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-gray-600">{resume.personalInfo.email}</p>
          <p className="text-gray-600">{resume.personalInfo.phone}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">{resume.personalInfo.location}</p>
          {resume.personalInfo.linkedin && (
            <p className="text-gray-600">
              LinkedIn: {resume.personalInfo.linkedin}
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300 pb-1">
            Executive Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700 text-sm">{edu.institution}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{edu.field}</span>
                  <span>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
