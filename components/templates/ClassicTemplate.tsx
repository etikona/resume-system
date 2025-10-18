import { Resume } from "../../app/types/resume";

interface ClassicTemplateProps {
  resume: Resume;
}

export default function ClassicTemplate({ resume }: ClassicTemplateProps) {
  return (
    <div className="bg-white text-slate-800 p-8 max-w-4xl mx-auto shadow-lg border-l-4 border-slate-900">
      {/* Header */}
      <div className="border-b-2 border-slate-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {resume.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {resume.personalInfo.email && (
            <span>📧 {resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>📞 {resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <span>📍 {resume.personalInfo.location}</span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {resume.summary && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Summary
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {exp.position}
                      </h3>
                      <p className="text-slate-700 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
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
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                  <p className="text-slate-700 text-sm">{edu.institution}</p>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{edu.field}</span>
                    <span>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="text-xs text-slate-600">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Projects
            </h2>
            <div className="space-y-3">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
