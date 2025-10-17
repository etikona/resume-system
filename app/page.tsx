"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Settings } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Perfect Resume
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build a professional resume with our modern, minimal template.
            Customize every section and see live previews instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/resume">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                <FileText className="w-5 h-5 mr-2" />
                Start Building
              </Button>
            </Link>
            <Link href="/preview">
              <Button variant="outline" size="lg">
                <Eye className="w-5 h-5 mr-2" />
                See Preview
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Easy Editing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Add, edit, and remove sections with our intuitive form
                interface. No complex formatting required.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                See your changes in real-time with our live preview feature.
                Perfect your resume before downloading.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Customizable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose from different themes and customize colors, fonts, and
                layouts to match your style.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
