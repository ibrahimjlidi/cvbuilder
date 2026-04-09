"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/cv-builder", label: "CV Builder", icon: "📄" },
    { href: "/job-tracker", label: "Job Tracker", icon: "💼" },
    { href: "/interview-prep", label: "Interview Prep", icon: "🎯" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Job Dashboard</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600 border-l-4 border-white"
                  : "hover:bg-blue-700"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition">
            {sidebarOpen ? "Logout" : "⏻"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-gray-600">Welcome back!</h2>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
