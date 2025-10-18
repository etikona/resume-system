"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Resume,
  PersonalInfo,
  Education,
  Experience,
  Project,
  Skill,
} from "../app/types/resume";
import {
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Code,
  User,
} from "lucide-react";

interface ResumeFormProps {
  resume: Resume;
  onChange: (resume: Resume) => void;
}

export default function ResumeForm({ resume, onChange }: ResumeFormProps) {
  const updatePersonalInfo = (updates: Partial<PersonalInfo>) => {
    onChange({
      ...resume,
      personalInfo: { ...resume.personalInfo, ...updates },
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    onChange({
      ...resume,
      education: [...resume.education, newEducation],
    });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      ...resume,
      education: resume.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...resume,
      education: resume.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    };
    onChange({
      ...resume,
      experience: [...resume.experience, newExperience],
    });
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    onChange({
      ...resume,
      experience: resume.experience.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...resume,
      experience: resume.experience.filter((exp) => exp.id !== id),
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
    };
    onChange({
      ...resume,
      projects: [...resume.projects, newProject],
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange({
      ...resume,
      projects: resume.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updates } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...resume,
      projects: resume.projects.filter((proj) => proj.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "intermediate",
      category: "",
    };
    onChange({
      ...resume,
      skills: [...resume.skills, newSkill],
    });
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    onChange({
      ...resume,
      skills: resume.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...resume,
      skills: resume.skills.filter((skill) => skill.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                value={resume.personalInfo.fullName}
                onChange={(e) =>
                  updatePersonalInfo({ fullName: e.target.value })
                }
                className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <Input
                placeholder="john.doe@example.com"
                type="email"
                value={resume.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Phone
              </label>
              <Input
                placeholder="+1 (555) 123-4567"
                value={resume.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Location
              </label>
              <Input
                placeholder="New York, NY"
                value={resume.personalInfo.location}
                onChange={(e) =>
                  updatePersonalInfo({ location: e.target.value })
                }
                className="border-slate-300 focus:border-slate-900 focus:ring-slate-900"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <CardTitle className="text-slate-900">Professional Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <textarea
            className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-slate-900 placeholder:text-slate-400"
            placeholder="Write a brief summary about yourself, highlighting your key achievements and career goals..."
            value={resume.summary}
            onChange={(e) => onChange({ ...resume, summary: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <GraduationCap className="w-5 h-5" />
              Education
            </CardTitle>
            <Button
              onClick={addEducation}
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {resume.education.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                No education added yet. Click "Add Education" to get started.
              </p>
            </div>
          ) : (
            resume.education.map((edu, index) => (
              <div
                key={edu.id}
                className="p-4 border border-slate-200 rounded-lg space-y-3 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-slate-900">
                    Education #{index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, { institution: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="Degree (e.g., Bachelor's)"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, { field: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="GPA (optional)"
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(edu.id, { gpa: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="Start Date (e.g., Sep 2018)"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="End Date (e.g., May 2022)"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                    className="border-slate-300"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Briefcase className="w-5 h-5" />
              Work Experience
            </CardTitle>
            <Button
              onClick={addExperience}
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {resume.experience.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                No experience added yet. Click "Add Experience" to get started.
              </p>
            </div>
          ) : (
            resume.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 border border-slate-200 rounded-lg space-y-3 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-slate-900">
                    Experience #{index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="Position/Title"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, { position: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="Start Date (e.g., Jan 2020)"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
                    }
                    className="border-slate-300"
                  />
                  <Input
                    placeholder="End Date (e.g., Dec 2022)"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                    className="border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <textarea
                    className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-slate-900 placeholder:text-slate-400"
                    placeholder="Describe your responsibilities, achievements, and key accomplishments..."
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, { description: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) =>
                      updateExperience(exp.id, { current: e.target.checked })
                    }
                    className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
                  />
                  <label
                    htmlFor={`current-${exp.id}`}
                    className="text-sm text-slate-700"
                  >
                    I currently work here
                  </label>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Code className="w-5 h-5" />
              Projects
            </CardTitle>
            <Button
              onClick={addProject}
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {resume.projects.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Code className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                No projects added yet. Click "Add Project" to get started.
              </p>
            </div>
          ) : (
            resume.projects.map((proj, index) => (
              <div
                key={proj.id}
                className="p-4 border border-slate-200 rounded-lg space-y-3 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-slate-900">
                    Project #{index + 1}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(proj.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Project Name
                    </label>
                    <Input
                      placeholder="My Awesome Project"
                      value={proj.name}
                      onChange={(e) =>
                        updateProject(proj.id, { name: e.target.value })
                      }
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Description
                    </label>
                    <textarea
                      className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-slate-900 placeholder:text-slate-400"
                      placeholder="Describe what this project does and what you accomplished..."
                      value={proj.description}
                      onChange={(e) =>
                        updateProject(proj.id, { description: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Technologies
                    </label>
                    <Input
                      placeholder="React, Node.js, MongoDB (comma-separated)"
                      value={proj.technologies.join(", ")}
                      onChange={(e) =>
                        updateProject(proj.id, {
                          technologies: e.target.value
                            .split(",")
                            .map((tech) => tech.trim())
                            .filter((tech) => tech.length > 0),
                        })
                      }
                      className="border-slate-300"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-900">Skills</CardTitle>
            <Button
              onClick={addSkill}
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {resume.skills.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">
                No skills added yet. Click "Add Skill" to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resume.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg bg-white"
                >
                  <Input
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(skill.id, { name: e.target.value })
                    }
                    className="border-slate-300 flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
