"use client";

import { CheckCircle, Clock, XCircle } from "lucide-react";

type VerificationStatus = "verified" | "pending" | "rejected";

interface VerificationBadgeProps {
  status: VerificationStatus;
}

export default function VerificationBadge({ status }: VerificationBadgeProps) {
  const getStatusConfig = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          text: "Verified",
          className: "bg-green-100 text-green-800 border-green-200",
        };
      case "pending":
        return {
          icon: Clock,
          text: "Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
      case "rejected":
        return {
          icon: XCircle,
          text: "Rejected",
          className: "bg-red-100 text-red-800 border-red-200",
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${config.className}`}
    >
      <Icon className="w-4 h-4" />
      {config.text}
    </div>
  );
}
