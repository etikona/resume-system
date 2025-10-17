import { Resume } from "../../app/types/resume";

interface MinimalTemplateProps {
  resume: Resume;
}

export default function MinimalTemplate({ resume }: MinimalTemplateProps) {
  return (
    <div className="bg-white text-gray-800 p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-wide">
          {resume.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>• {resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <span>• {resume.personalInfo.location}</span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {resume.summary && (
          <section className="text-center">
            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-normal text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-gray-600 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="font-normal text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  <div className="flex justify-between text-xs text-gray-500">
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
    </div>
  );
}
