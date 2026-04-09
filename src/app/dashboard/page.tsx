"use client";

import { useEffect, useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

interface DashboardStats {
  totalApplications: number;
  appliedCount: number;
  interviewCount: number;
  offerCount: number;
  rejectionCount: number;
  successRate: string;
  recentApplications: any[];
  upcomingInterviews: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <SidebarLayout>
        <div className="text-center py-12">Loading...</div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your job search progress in real-time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total Applications"
            value={stats?.totalApplications || 0}
            icon="📝"
            color="blue"
          />
          <StatCard
            title="Applied"
            value={stats?.appliedCount || 0}
            icon="✓"
            color="gray"
          />
          <StatCard
            title="Interviews"
            value={stats?.interviewCount || 0}
            icon="🎤"
            color="purple"
          />
          <StatCard
            title="Offers"
            value={stats?.offerCount || 0}
            icon="🎁"
            color="green"
          />
          <StatCard
            title="Success Rate"
            value={stats?.successRate || "0%"}
            icon="📈"
            color="orange"
          />
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Applications
          </h2>
          {stats?.recentApplications && stats.recentApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Company
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Position
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentApplications.map((app) => (
                    <tr key={app.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{app.company}</td>
                      <td className="px-4 py-3">{app.jobTitle}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No applications yet</p>
          )}
        </div>

        {/* Upcoming Interviews */}
        {stats?.upcomingInterviews && stats.upcomingInterviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Upcoming Interviews
            </h2>
            <div className="space-y-3">
              {stats.upcomingInterviews.map((interview) => (
                <div key={interview.id} className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <p className="font-semibold text-gray-900">
                    {interview.company} - {interview.position}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(interview.interviewDate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    gray: "bg-gray-50 border-gray-200",
    purple: "bg-purple-50 border-purple-200",
    green: "bg-green-50 border-green-200",
    orange: "bg-orange-50 border-orange-200",
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Accepted":
    case "Offer":
      return "bg-green-100 text-green-800";
    case "Interview":
      return "bg-blue-100 text-blue-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
