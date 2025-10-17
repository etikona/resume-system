import { Resume } from "../../app/types/resume";

interface CreativeTemplateProps {
  resume: Resume;
}

export default function CreativeTemplate({ resume }: CreativeTemplateProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 text-gray-800 p-8 max-w-4xl mx-auto shadow-xl rounded-2xl border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-secondary text-white p-6 rounded-lg mb-4">
          <h1 className="text-4xl font-bold mb-2">
            {resume.personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg opacity-90">Professional Resume</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {resume.personalInfo.email && (
            <span>✉️ {resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>📱 {resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <span>📍 {resume.personalInfo.location}</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Summary */}
          {resume.summary && (
            <section>
              <h2 className="text-xl font-semibold text-secondary mb-3 flex items-center">
                <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                About Me
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed bg-white p-4 rounded-lg shadow-sm">
                {resume.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-secondary mb-3 flex items-center">
                <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                Experience
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {exp.description}
                    </p>
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
              <h2 className="text-xl font-semibold text-secondary mb-3 flex items-center">
                <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                Education
              </h2>
              <div className="space-y-3">
                {resume.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.field}</p>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
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

          {/* Projects */}
          {resume.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-secondary mb-3 flex items-center">
                <span className="w-3 h-3 bg-secondary rounded-full mr-2"></span>
                Projects
              </h2>
              <div className="space-y-3">
                {resume.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {proj.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
