"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  EcosystemData,
  PlatformConnection,
  Internship,
  Training,
  Hackathon,
  Course,
} from "../types/resume";
import { useResume } from "./ResumeContexts";

interface EcosystemContextType {
  ecosystemData: EcosystemData;
  syncPlatform: (platformType: string) => Promise<void>;
  syncAllPlatforms: () => Promise<void>;
  connectPlatform: (platform: PlatformConnection) => void;
  disconnectPlatform: (platformId: string) => void;
  addActivityToResume: (activityType: string, activityId: string) => void;
  isSyncing: boolean;
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(
  undefined
);

const STORAGE_KEY = "ecosystemData";

// Initial ecosystem data
const initialEcosystemData: EcosystemData = {
  internships: [],
  trainings: [],
  hackathons: [],
  courses: [],
  platformConnections: [],
  lastSyncedAt: undefined,
};

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
  const [ecosystemData, setEcosystemData] =
    useState<EcosystemData>(initialEcosystemData);
  const [isSyncing, setIsSyncing] = useState(false);
  const { currentResume, updateResume } = useResume();

  // Load ecosystem data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setEcosystemData(parsedData);
      } catch (error) {
        console.error("Error loading ecosystem data:", error);
      }
    }
  }, []);

  // Save ecosystem data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ecosystemData));
  }, [ecosystemData]);

  // Mock sync function - simulates fetching from external platforms
  const syncPlatform = async (platformType: string) => {
    setIsSyncing(true);

    // Simulate API delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const platformConnection = ecosystemData.platformConnections.find(
      (p) => p.platformType === platformType && p.connected
    );

    if (!platformConnection) {
      setIsSyncing(false);
      return;
    }

    // Generate mock data based on platform type
    switch (platformType) {
      case "internship":
        const mockInternships: Internship[] = [
          {
            id: `int-${Date.now()}`,
            company: "TechCorp Solutions",
            role: "Software Engineering Intern",
            startDate: "Jan 2024",
            endDate: "Apr 2024",
            description:
              "Developed responsive web applications using React and Node.js. Collaborated with senior developers on feature implementation and bug fixes. Participated in code reviews and agile development processes.",
            skills: ["React", "Node.js", "MongoDB", "Git"],
            certificate: "Certificate of Completion",
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `int-${Date.now() + 1}`,
            company: "StartupHub Inc",
            role: "Frontend Developer Intern",
            startDate: "Sep 2023",
            endDate: "Dec 2023",
            description:
              "Built user interfaces for web applications. Implemented responsive designs and improved page load times by 40%. Worked with design team to create pixel-perfect implementations.",
            skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
        ];

        setEcosystemData((prev) => ({
          ...prev,
          internships: [...prev.internships, ...mockInternships],
          lastSyncedAt: new Date().toISOString(),
          platformConnections: prev.platformConnections.map((p) =>
            p.id === platformConnection.id
              ? {
                  ...p,
                  lastSyncedAt: new Date().toISOString(),
                  itemCount: p.itemCount + mockInternships.length,
                }
              : p
          ),
        }));
        break;

      case "training":
        const mockTrainings: Training[] = [
          {
            id: `train-${Date.now()}`,
            trainingName: "AWS Cloud Practitioner Certification",
            provider: "AWS Training & Certification",
            completionDate: "Dec 2023",
            duration: "3 months",
            skills: ["AWS", "Cloud Computing", "DevOps", "EC2", "S3"],
            certificateUrl: "https://aws.amazon.com/certificate/...",
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `train-${Date.now() + 1}`,
            trainingName: "Full Stack Web Development Bootcamp",
            provider: "Coding Academy",
            completionDate: "Nov 2023",
            duration: "6 months",
            skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
            certificateUrl: "https://codingacademy.com/cert/...",
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
        ];

        setEcosystemData((prev) => ({
          ...prev,
          trainings: [...prev.trainings, ...mockTrainings],
          lastSyncedAt: new Date().toISOString(),
          platformConnections: prev.platformConnections.map((p) =>
            p.id === platformConnection.id
              ? {
                  ...p,
                  lastSyncedAt: new Date().toISOString(),
                  itemCount: p.itemCount + mockTrainings.length,
                }
              : p
          ),
        }));
        break;

      case "hackathon":
        const mockHackathons: Hackathon[] = [
          {
            id: `hack-${Date.now()}`,
            hackathonName: "AI Innovation Challenge 2024",
            organizer: "TechEvents Inc",
            date: "Jan 2024",
            rank: "Winner - 1st Place",
            projectName: "Smart Study Assistant",
            projectDescription:
              "AI-powered study planner that uses machine learning to create personalized study schedules. Features include automatic topic prioritization, progress tracking, and intelligent reminders.",
            teamSize: 4,
            technologies: ["Python", "TensorFlow", "React", "FastAPI"],
            projectUrl: "https://github.com/team/smart-study",
            certificateUrl: "https://techevent.com/certificate/...",
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `hack-${Date.now() + 1}`,
            hackathonName: "FinTech Hackathon 2023",
            organizer: "Bank Innovators",
            date: "Oct 2023",
            rank: "Runner-up - 2nd Place",
            projectName: "Budget Buddy",
            projectDescription:
              "Mobile app for personal finance management with automated expense tracking, budget recommendations, and financial insights visualization.",
            teamSize: 3,
            technologies: ["React Native", "Node.js", "MongoDB", "Chart.js"],
            projectUrl: "https://github.com/team/budget-buddy",
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
        ];

        setEcosystemData((prev) => ({
          ...prev,
          hackathons: [...prev.hackathons, ...mockHackathons],
          lastSyncedAt: new Date().toISOString(),
          platformConnections: prev.platformConnections.map((p) =>
            p.id === platformConnection.id
              ? {
                  ...p,
                  lastSyncedAt: new Date().toISOString(),
                  itemCount: p.itemCount + mockHackathons.length,
                }
              : p
          ),
        }));
        break;

      case "learning":
        const mockCourses: Course[] = [
          {
            id: `course-${Date.now()}`,
            courseName: "Advanced React Development",
            platform: "LearnPro",
            instructor: "John Doe",
            completionDate: "Dec 2023",
            duration: "40 hours",
            grade: "A",
            certificateUrl: "https://learnpro.com/cert/...",
            skills: ["React", "Redux", "TypeScript", "Testing"],
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `course-${Date.now() + 1}`,
            courseName: "Machine Learning Fundamentals",
            platform: "DataCamp",
            instructor: "Dr. Jane Smith",
            completionDate: "Nov 2023",
            duration: "60 hours",
            grade: "A+",
            certificateUrl: "https://datacamp.com/cert/...",
            skills: ["Python", "ML", "NumPy", "Pandas", "Scikit-learn"],
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: `course-${Date.now() + 2}`,
            courseName: "UI/UX Design Principles",
            platform: "DesignHub",
            instructor: "Sarah Johnson",
            completionDate: "Oct 2023",
            duration: "30 hours",
            grade: "A",
            certificateUrl: "https://designhub.com/cert/...",
            skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
            verified: true,
            platformId: platformConnection.id,
            addedToResume: false,
            createdAt: new Date().toISOString(),
          },
        ];

        setEcosystemData((prev) => ({
          ...prev,
          courses: [...prev.courses, ...mockCourses],
          lastSyncedAt: new Date().toISOString(),
          platformConnections: prev.platformConnections.map((p) =>
            p.id === platformConnection.id
              ? {
                  ...p,
                  lastSyncedAt: new Date().toISOString(),
                  itemCount: p.itemCount + mockCourses.length,
                }
              : p
          ),
        }));
        break;
    }

    setIsSyncing(false);
  };

  // Sync all connected platforms
  const syncAllPlatforms = async () => {
    const connectedPlatforms = ecosystemData.platformConnections.filter(
      (p) => p.connected
    );

    for (const platform of connectedPlatforms) {
      await syncPlatform(platform.platformType);
    }
  };

  // Connect a platform
  const connectPlatform = (platform: PlatformConnection) => {
    setEcosystemData((prev) => ({
      ...prev,
      platformConnections: [
        ...prev.platformConnections.filter((p) => p.id !== platform.id),
        { ...platform, connected: true, connectedAt: new Date().toISOString() },
      ],
    }));
  };

  // Disconnect a platform
  const disconnectPlatform = (platformId: string) => {
    setEcosystemData((prev) => ({
      ...prev,
      platformConnections: prev.platformConnections.map((p) =>
        p.id === platformId ? { ...p, connected: false } : p
      ),
    }));
  };

  // Add activity to resume
  const addActivityToResume = (activityType: string, activityId: string) => {
    if (!currentResume) {
      alert("Please select a resume first!");
      return;
    }

    switch (activityType) {
      case "internship":
        const internship = ecosystemData.internships.find(
          (i) => i.id === activityId
        );
        if (internship) {
          const newExperience = {
            id: internship.id,
            company: internship.company,
            position: internship.role,
            startDate: internship.startDate,
            endDate: internship.endDate,
            description: internship.description,
            current: false,
            verified: internship.verified,
            source: "internship_platform" as const,
          };
          updateResume(currentResume.id, {
            experience: [...currentResume.experience, newExperience],
          });

          // Mark as added
          setEcosystemData((prev) => ({
            ...prev,
            internships: prev.internships.map((i) =>
              i.id === activityId ? { ...i, addedToResume: true } : i
            ),
          }));

          alert("✅ Internship added to your resume!");
        }
        break;

      case "hackathon":
        const hackathon = ecosystemData.hackathons.find(
          (h) => h.id === activityId
        );
        if (hackathon) {
          const newProject = {
            id: hackathon.id,
            name: hackathon.projectName,
            description: hackathon.projectDescription,
            technologies: hackathon.technologies,
            link: hackathon.projectUrl,
            verified: hackathon.verified,
            source: "hackathon" as const,
          };
          updateResume(currentResume.id, {
            projects: [...currentResume.projects, newProject],
          });

          setEcosystemData((prev) => ({
            ...prev,
            hackathons: prev.hackathons.map((h) =>
              h.id === activityId ? { ...h, addedToResume: true } : h
            ),
          }));

          alert("✅ Hackathon project added to your resume!");
        }
        break;

      case "training":
        const training = ecosystemData.trainings.find(
          (t) => t.id === activityId
        );
        if (training) {
          // Add training skills to resume skills
          const newSkills = training.skills.map((skillName) => ({
            id: `skill-${Date.now()}-${Math.random()}`,
            name: skillName,
            category: "Technical",
            level: "intermediate",
            verified: true,
          }));

          updateResume(currentResume.id, {
            skills: [...currentResume.skills, ...newSkills],
          });

          setEcosystemData((prev) => ({
            ...prev,
            trainings: prev.trainings.map((t) =>
              t.id === activityId ? { ...t, addedToResume: true } : t
            ),
          }));

          alert("✅ Training and skills added to your resume!");
        }
        break;

      case "course":
        const course = ecosystemData.courses.find((c) => c.id === activityId);
        if (course) {
          // Add course skills to resume
          const newSkills = course.skills.map((skillName) => ({
            id: `skill-${Date.now()}-${Math.random()}`,
            name: skillName,
            category: "Technical",
            level: "intermediate",
            verified: true,
          }));

          updateResume(currentResume.id, {
            skills: [...currentResume.skills, ...newSkills],
          });

          setEcosystemData((prev) => ({
            ...prev,
            courses: prev.courses.map((c) =>
              c.id === activityId ? { ...c, addedToResume: true } : c
            ),
          }));

          alert("✅ Course and skills added to your resume!");
        }
        break;
    }
  };

  const value: EcosystemContextType = {
    ecosystemData,
    syncPlatform,
    syncAllPlatforms,
    connectPlatform,
    disconnectPlatform,
    addActivityToResume,
    isSyncing,
  };

  return (
    <EcosystemContext.Provider value={value}>
      {children}
    </EcosystemContext.Provider>
  );
}

export function useEcosystem() {
  const context = useContext(EcosystemContext);
  if (context === undefined) {
    throw new Error("useEcosystem must be used within an EcosystemProvider");
  }
  return context;
}
