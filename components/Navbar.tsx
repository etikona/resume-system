"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X, Home, Layers, Eye, Network } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Ecosystem", href: "/ecosystem", icon: Network },
    { name: "Templates", href: "/templates", icon: Layers },
    { name: "Resume Builder", href: "/resume", icon: FileText },
    { name: "Preview", href: "/preview", icon: Eye },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              ResumeBuilder
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => router.push(item.href)}
                  className={`gap-2 ${
                    isActive(item.href)
                      ? "bg-slate-100 text-slate-900 font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Button>
              );
            })}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => router.push("/templates")}
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    onClick={() => {
                      router.push(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`justify-start gap-2 ${
                      isActive(item.href)
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                );
              })}
              <div className="pt-2 mt-2 border-t border-slate-200">
                <Button
                  onClick={() => {
                    router.push("/templates");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
