"use client";

import { useState } from "react";
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
import { Plus, Trash2, Edit } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={resume.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            />
            <Input
              placeholder="Email"
              type="email"
              value={resume.personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={resume.personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={resume.personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
            placeholder="Write a brief summary about yourself..."
            value={resume.summary}
            onChange={(e) => onChange({ ...resume, summary: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.education.map((edu) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">Education Entry</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, { institution: e.target.value })
                  }
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                />
                <Input
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, { field: e.target.value })
                  }
                />
                <Input
                  placeholder="GPA"
                  value={edu.gpa}
                  onChange={(e) =>
                    updateEducation(edu.id, { gpa: e.target.value })
                  }
                />
                <Input
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { startDate: e.target.value })
                  }
                />
                <Input
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { endDate: e.target.value })
                  }
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={addExperience} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.experience.map((exp) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">Experience Entry</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(exp.id, { position: e.target.value })
                  }
                />
                <Input
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { startDate: e.target.value })
                  }
                />
                <Input
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { endDate: e.target.value })
                  }
                />
              </div>
              <textarea
                className="w-full h-20 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Job description and responsibilities..."
                value={exp.description}
                onChange={(e) =>
                  updateExperience(exp.id, { description: e.target.value })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <Button onClick={addProject} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resume.projects.map((proj) => (
            <div key={proj.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">Project Entry</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(proj.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) =>
                  updateProject(proj.id, { name: e.target.value })
                }
              />
              <textarea
                className="w-full h-20 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Project description..."
                value={proj.description}
                onChange={(e) =>
                  updateProject(proj.id, { description: e.target.value })
                }
              />
              <Input
                placeholder="Technologies (comma-separated)"
                value={proj.technologies.join(", ")}
                onChange={(e) =>
                  updateProject(proj.id, {
                    technologies: e.target.value
                      .split(",")
                      .map((tech) => tech.trim()),
                  })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
