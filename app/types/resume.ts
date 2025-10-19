// app/types/resume.ts - Extended with ecosystem features

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
  verified?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
  verified?: boolean;
  source?: "manual" | "internship_platform";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  verified?: boolean;
  source?: "manual" | "hackathon" | "personal";
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number | string;
  verified?: boolean;
}

// NEW: Ecosystem Data Types
export interface Internship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
  certificate?: string;
  verified: boolean;
  platformId: string;
  addedToResume: boolean;
  createdAt: string;
}

export interface Training {
  id: string;
  trainingName: string;
  provider: string;
  completionDate: string;
  duration: string;
  skills: string[];
  certificateUrl?: string;
  verified: boolean;
  platformId: string;
  addedToResume: boolean;
  createdAt: string;
}

export interface Hackathon {
  id: string;
  hackathonName: string;
  organizer: string;
  date: string;
  rank?: string;
  projectName: string;
  projectDescription: string;
  teamSize: number;
  technologies: string[];
  projectUrl?: string;
  certificateUrl?: string;
  verified: boolean;
  platformId: string;
  addedToResume: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  courseName: string;
  platform: string;
  instructor?: string;
  completionDate: string;
  duration: string;
  grade?: string;
  certificateUrl?: string;
  skills: string[];
  verified: boolean;
  platformId: string;
  addedToResume: boolean;
  createdAt: string;
}

export interface PlatformConnection {
  id: string;
  platformType: "internship" | "training" | "hackathon" | "learning";
  platformName: string;
  connected: boolean;
  connectedAt?: string;
  apiKey?: string; // Stored encrypted in real app
  lastSyncedAt?: string;
  autoSync: boolean;
  itemCount: number;
}

export interface EcosystemData {
  internships: Internship[];
  trainings: Training[];
  hackathons: Hackathon[];
  courses: Course[];
  platformConnections: PlatformConnection[];
  lastSyncedAt?: string;
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
