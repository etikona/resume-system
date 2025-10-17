"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Resume, Template } from "../types/resume";

interface ResumeContextType {
  resumes: Resume[];
  currentResume: Resume | null;
  addResume: (template: Template) => void;
  updateResume: (id: string, updates: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  setCurrentResume: (resume: Resume) => void;
  duplicateResume: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialResumeData: Omit<
  Resume,
  "id" | "title" | "template" | "createdAt" | "updatedAt"
> = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  summary: "",
};

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);

  // Load resumes from localStorage on mount
  useEffect(() => {
    const savedResumes = localStorage.getItem("resumes");
    if (savedResumes) {
      try {
        const parsedResumes = JSON.parse(savedResumes);
        setResumes(parsedResumes);
        if (parsedResumes.length > 0) {
          setCurrentResume(parsedResumes[0]);
        }
      } catch (error) {
        console.error("Error loading resumes from localStorage:", error);
      }
    }
  }, []);

  // Save resumes to localStorage whenever resumes change
  useEffect(() => {
    if (resumes.length > 0) {
      localStorage.setItem("resumes", JSON.stringify(resumes));
    }
  }, [resumes]);

  const addResume = (template: Template) => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title: `${template.charAt(0).toUpperCase() + template.slice(1)} Resume`,
      ...initialResumeData,
      template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setResumes((prev) => [...prev, newResume]);
    setCurrentResume(newResume);
  };

  const updateResume = (id: string, updates: Partial<Resume>) => {
    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === id
          ? { ...resume, ...updates, updatedAt: new Date().toISOString() }
          : resume
      )
    );

    if (currentResume?.id === id) {
      setCurrentResume((prev) =>
        prev
          ? { ...prev, ...updates, updatedAt: new Date().toISOString() }
          : null
      );
    }
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
    if (currentResume?.id === id) {
      setCurrentResume(
        resumes.length > 1 ? resumes.find((r) => r.id !== id) || null : null
      );
    }
  };

  const duplicateResume = (id: string) => {
    const original = resumes.find((r) => r.id === id);
    if (original) {
      const duplicated: Resume = {
        ...original,
        id: Date.now().toString(),
        title: `${original.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setResumes((prev) => [...prev, duplicated]);
      setCurrentResume(duplicated);
    }
  };

  const value: ResumeContextType = {
    resumes,
    currentResume,
    addResume,
    updateResume,
    deleteResume,
    setCurrentResume,
    duplicateResume,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
