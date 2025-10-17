import { Resume } from "../../app/types/resume";

interface ModernTemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: ModernTemplateProps) {
  return (
    <div className="bg-white text-gray-800 p-8 max-w-4xl mx-auto shadow-2xl rounded-lg border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary mb-3">
          {resume.personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <span>{resume.personalInfo.location}</span>
          )}
          {resume.personalInfo.linkedin && (
            <span>LinkedIn: {resume.personalInfo.linkedin}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-secondary mb-3 border-b-2 border-secondary pb-1">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {resume.summary}
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Experience */}
          {resume.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-secondary mb-3 border-b-2 border-secondary pb-1">
                EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{exp.company}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">
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
              <h2 className="text-xl font-semibold text-secondary mb-3 border-b-2 border-secondary pb-1">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {resume.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary text-white text-xs rounded-full"
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
        <div className="space-y-6">
          {/* Education */}
          {resume.education.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-secondary mb-3 border-b-2 border-secondary pb-1">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                    <p className="text-gray-600 text-xs">{edu.field}</p>
                    <div className="flex justify-between text-xs text-gray-500">
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
              <h2 className="text-xl font-semibold text-secondary mb-3 border-b-2 border-secondary pb-1">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
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
