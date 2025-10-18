// ==================== ModernTemplate.tsx ====================
import { Resume } from "../../app/types/resume";

interface ModernTemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: ModernTemplateProps) {
  return (
    <div className="bg-white text-slate-800 p-8 max-w-4xl mx-auto shadow-lg rounded-lg border border-slate-200">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-slate-900">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          {resume.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && <span>•</span>}
          {resume.personalInfo.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && <span>•</span>}
          {resume.personalInfo.location && (
            <span>{resume.personalInfo.location}</span>
          )}
          {resume.personalInfo.linkedin && <span>•</span>}
          {resume.personalInfo.linkedin && (
            <span>LinkedIn: {resume.personalInfo.linkedin}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3 pb-2 border-b-2 border-slate-900">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-slate-700 leading-relaxed text-sm">
            {resume.summary}
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Experience */}
          {resume.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-slate-900">
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-slate-600 whitespace-nowrap">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm font-medium">
                      {exp.company}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-slate-900">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <h3 className="font-semibold text-slate-900">
                      {proj.name}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-900 text-white text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Education */}
          {resume.education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-slate-900">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h3 className="font-semibold text-slate-900">
                      {edu.degree}
                    </h3>
                    <p className="text-slate-700 text-sm">{edu.institution}</p>
                    <p className="text-slate-600 text-xs">{edu.field}</p>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b-2 border-slate-900">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
