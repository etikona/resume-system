export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number | string;
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  summary: string;
  template: Template;
  createdAt: string;
  updatedAt: string;
}

export type Template =
  | "modern"
  | "classic"
  | "minimal"
  | "executive"
  | "creative";

export type VerificationStatus = "verified" | "pending" | "rejected";
