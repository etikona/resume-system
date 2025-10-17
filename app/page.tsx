"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, Settings, Download, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Professional Resume Builder</span>
          </div>

          <h1 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Create Your Perfect
            <span className="block bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Resume in Minutes
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Build a professional resume with our modern templates. Customize
            every section with live preview and download as PDF instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              onClick={() => (window.location.href = "/resume")}
            >
              <FileText className="w-5 h-5 mr-2" />
              Start Building Resume
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-6 text-base font-medium rounded-lg transition-all duration-200 w-full sm:w-auto"
              onClick={() => (window.location.href = "/preview")}
            >
              <Eye className="w-5 h-5 mr-2" />
              View Templates
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-slate-900 text-xl">
                Easy Editing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Add, edit, and remove sections with our intuitive form
                interface. No complex formatting required.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-slate-900 text-xl">
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                See your changes in real-time with our live preview feature.
                Perfect your resume before downloading.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center mb-4 shadow-md">
                <Download className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-slate-900 text-xl">
                PDF Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 leading-relaxed">
                Download your finished resume as a high-quality PDF file. Ready
                to send to employers instantly.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-600 mb-4">
            Join thousands of professionals who built their resumes with us
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
