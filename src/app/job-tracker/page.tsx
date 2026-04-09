"use client";

import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

interface Application {
  id: number;
  company: string;
  jobTitle: string;
  position: string;
  location: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected" | "Negotiating" | "Accepted";
  appliedDate: string;
  notes: string;
}

export default function JobTracker() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    position: "",
    location: "",
    status: "Applied" as const,
    appliedDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddApplication = () => {
    if (formData.company && formData.jobTitle) {
      setApplications((prev) => [
        ...prev,
        {
          id: Date.now(),
          company: formData.company,
          jobTitle: formData.jobTitle,
          position: formData.position,
          location: formData.location,
          status: formData.status as any,
          appliedDate: formData.appliedDate,
          notes: formData.notes,
        },
      ]);
      setFormData({
        company: "",
        jobTitle: "",
        position: "",
        location: "",
        status: "Applied",
        appliedDate: new Date().toISOString().split("T")[0],
        notes: "",
      });
      setShowForm(false);
    }
  };

  const statusColors = {
    Applied: "bg-gray-100 text-gray-800",
    Interview: "bg-blue-100 text-blue-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Negotiating: "bg-purple-100 text-purple-800",
    Accepted: "bg-green-100 text-green-800",
  };

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Tracker</h1>
            <p className="text-gray-600 mt-2">Track all your job applications</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? "Cancel" : "+ Add Application"}
          </button>
        </div>

        {/* Add Application Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add New Application
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Google"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Senior Frontend Developer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Remote"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Berlin, Germany"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Negotiating</option>
                  <option>Accepted</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applied Date
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleAddApplication}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add Application
            </button>
          </div>
        )}

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Date Applied
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app: any) => (
                    <tr key={app.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium">{app.company}</td>
                      <td className="px-6 py-3">{app.jobTitle}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            statusColors[app.status as keyof typeof statusColors]
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {new Date(app.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <button className="text-blue-600 hover:underline text-sm">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No applications yet. {!showForm && "Click 'Add Application' to get started!"}
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
}
