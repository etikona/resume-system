"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  BookOpen,
  Trophy,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  LinkIcon,
  Shield,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useEcosystem } from "../app/contexts/EcosystemContext";
import { PlatformConnection } from "../app/types/resume";

export default function EcosystemDashboard() {
  const {
    ecosystemData,
    syncPlatform,
    syncAllPlatforms,
    connectPlatform,
    disconnectPlatform,
    addActivityToResume,
    isSyncing,
  } = useEcosystem();

  const [showConnectModal, setShowConnectModal] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "internship":
        return <Briefcase className="w-5 h-5" />;
      case "training":
        return <GraduationCap className="w-5 h-5" />;
      case "hackathon":
        return <Trophy className="w-5 h-5" />;
      case "learning":
      case "course":
        return <BookOpen className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const handleConnectPlatform = (
    platformType: string,
    platformName: string
  ) => {
    const newPlatform: PlatformConnection = {
      id: `platform-${Date.now()}`,
      platformType: platformType as any,
      platformName,
      connected: true,
      connectedAt: new Date().toISOString(),
      autoSync: true,
      itemCount: 0,
      lastSyncedAt: undefined,
    };
    connectPlatform(newPlatform);
    setShowConnectModal(false);
  };

  // Calculate stats
  const connectedPlatformsCount = ecosystemData.platformConnections.filter(
    (p) => p.connected
  ).length;
  const totalActivities =
    ecosystemData.internships.length +
    ecosystemData.trainings.length +
    ecosystemData.hackathons.length +
    ecosystemData.courses.length;
  const verifiedCount =
    ecosystemData.internships.filter((i) => i.verified).length +
    ecosystemData.trainings.filter((t) => t.verified).length +
    ecosystemData.hackathons.filter((h) => h.verified).length +
    ecosystemData.courses.filter((c) => c.verified).length;

  // Get all activities for the feed
  const allActivities = [
    ...ecosystemData.internships.map((i) => ({
      ...i,
      type: "internship",
      title: `${i.role} at ${i.company}`,
      date: i.startDate,
    })),
    ...ecosystemData.trainings.map((t) => ({
      ...t,
      type: "training",
      title: t.trainingName,
      date: t.completionDate,
    })),
    ...ecosystemData.hackathons.map((h) => ({
      ...h,
      type: "hackathon",
      title: `${h.hackathonName} - ${h.rank || "Participated"}`,
      date: h.date,
    })),
    ...ecosystemData.courses.map((c) => ({
      ...c,
      type: "course",
      title: c.courseName,
      date: c.completionDate,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Ecosystem Dashboard
          </h1>
          <p className="text-slate-600">
            Connect platforms and automatically update your resume with verified
            activities
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Connected Platforms
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {connectedPlatformsCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Total Activities
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {totalActivities}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Verified Items</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {verifiedCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Last Synced</p>
                  <p className="text-lg font-bold text-slate-900">
                    {ecosystemData.lastSyncedAt
                      ? new Date(ecosystemData.lastSyncedAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : "Never"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Platform Connections */}
          <div>
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-900">
                    Platform Connections
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => syncAllPlatforms()}
                    disabled={isSyncing}
                    className="gap-2"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`}
                    />
                    Sync All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {ecosystemData.platformConnections.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <LinkIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        No platforms connected yet. Connect your first platform
                        to get started!
                      </p>
                    </div>
                  ) : (
                    ecosystemData.platformConnections.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            {getIcon(platform.platformType)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {platform.platformName}
                            </h4>
                            <p className="text-sm text-slate-600">
                              {platform.connected
                                ? `${platform.itemCount} items • Synced ${
                                    platform.lastSyncedAt
                                      ? new Date(
                                          platform.lastSyncedAt
                                        ).toLocaleTimeString()
                                      : "never"
                                  }`
                                : "Not connected"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {platform.connected && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                syncPlatform(platform.platformType)
                              }
                              disabled={isSyncing}
                            >
                              <RefreshCw
                                className={`w-4 h-4 ${
                                  isSyncing ? "animate-spin" : ""
                                }`}
                              />
                            </Button>
                          )}
                          <Button
                            variant={platform.connected ? "outline" : "default"}
                            size="sm"
                            onClick={() =>
                              platform.connected
                                ? disconnectPlatform(platform.id)
                                : null
                            }
                            className={
                              platform.connected
                                ? "border-slate-300"
                                : "bg-slate-900 hover:bg-slate-800"
                            }
                          >
                            {platform.connected ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-2 border-slate-300 hover:border-slate-400 text-slate-600"
                    onClick={() => setShowConnectModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Platform
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200">
                <CardTitle className="text-slate-900">
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {allActivities.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">
                        No activities yet. Connect platforms and sync to see
                        your activities here.
                      </p>
                    </div>
                  ) : (
                    allActivities.slice(0, 5).map((activity: any) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 mb-1">
                            {activity.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {activity.date}
                            </span>
                            <span
                              className={`flex items-center gap-1 ${
                                activity.verified
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }`}
                            >
                              {activity.verified ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <AlertCircle className="w-3 h-3" />
                              )}
                              {activity.verified ? "Verified" : "Pending"}
                            </span>
                          </div>
                        </div>
                        {!activity.addedToResume && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              addActivityToResume(activity.type, activity.id)
                            }
                            className="flex-shrink-0"
                          >
                            Add to Resume
                          </Button>
                        )}
                        {activity.addedToResume && (
                          <span className="text-xs text-green-600 flex items-center gap-1 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                            Added
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <Card
            className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              handleConnectPlatform("internship", "Internship Hub")
            }
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Connect Internship Platform
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Sync your internship experiences
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleConnectPlatform("training", "Skill Academy")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Connect Training Platform
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Sync your training and certifications
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleConnectPlatform("hackathon", "HackQuest")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Connect Hackathon Platform
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Sync your hackathon achievements
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleConnectPlatform("learning", "LearnPro")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Connect Learning Platform
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Sync your online courses
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  🎉 How It Works
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  Connect your platforms, sync your activities, and they'll
                  automatically appear here. Click "Add to Resume" to include
                  them in your professional resume with verification badges!
                </p>
                <div className="flex gap-2 text-xs text-slate-600">
                  <span className="bg-white px-3 py-1 rounded-full">
                    ✓ Auto-sync enabled
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full">
                    ✓ Verified badges
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full">
                    ✓ One-click add to resume
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
