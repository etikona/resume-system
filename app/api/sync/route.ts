// app/api/sync/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/sync
 * Sync data from connected platforms
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, platforms } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Mock sync logic - replace with actual implementation
    const syncResults = {
      internships: await syncInternshipPlatform(userId),
      trainings: await syncTrainingPlatform(userId),
      hackathons: await syncHackathonPlatform(userId),
      courses: await syncCoursePlatform(userId),
    };

    return NextResponse.json({
      success: true,
      data: syncResults,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      {
        error: "Sync failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/sync?userId=xxx
 * Get sync status and history
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Mock data - replace with database query
    const syncHistory = [
      {
        id: "1",
        timestamp: new Date().toISOString(),
        platform: "Internship Hub",
        itemsSynced: 3,
        status: "success",
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        platform: "LearnPro",
        itemsSynced: 5,
        status: "success",
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        lastSyncedAt: new Date().toISOString(),
        history: syncHistory,
      },
    });
  } catch (error) {
    console.error("Get sync error:", error);
    return NextResponse.json(
      { error: "Failed to get sync data" },
      { status: 500 }
    );
  }
}

// Helper functions for syncing different platforms
async function syncInternshipPlatform(userId: string) {
  // Mock implementation - replace with actual API calls
  return {
    platform: "Internship Hub",
    synced: 3,
    failed: 0,
    items: [
      {
        id: "int-1",
        company: "TechCorp",
        role: "Software Engineering Intern",
        startDate: "2024-01-01",
        endDate: "2024-04-01",
        verified: true,
      },
    ],
  };
}

async function syncTrainingPlatform(userId: string) {
  return {
    platform: "Skill Academy",
    synced: 2,
    failed: 0,
    items: [
      {
        id: "train-1",
        trainingName: "AWS Cloud Practitioner",
        provider: "AWS",
        completionDate: "2024-01-15",
        verified: true,
      },
    ],
  };
}

async function syncHackathonPlatform(userId: string) {
  return {
    platform: "HackQuest",
    synced: 1,
    failed: 0,
    items: [
      {
        id: "hack-1",
        hackathonName: "AI Innovation Challenge 2024",
        organizer: "TechEvents",
        date: "2024-01-05",
        rank: "Winner",
        verified: true,
      },
    ],
  };
}

async function syncCoursePlatform(userId: string) {
  return {
    platform: "LearnPro",
    synced: 5,
    failed: 0,
    items: [
      {
        id: "course-1",
        courseName: "Advanced React Development",
        platform: "LearnPro",
        completionDate: "2024-01-10",
        verified: true,
      },
    ],
  };
}
