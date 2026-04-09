"use client";

import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function CVBuilder() {
  const [cv, setCv] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    about: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setCv((prev) => ({ ...prev, [name]: value }));
  };

  const handleExport = () => {
    alert("Export to PDF feature coming soon!");
  };

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
          <p className="text-gray-600 mt-2">
            Create an ATS-optimized professional CV
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={cv.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={cv.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={cv.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={cv.location}
                    onChange={handleChange}
                    placeholder="Berlin, Germany"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    name="headline"
                    value={cv.headline}
                    onChange={handleChange}
                    placeholder="Senior Frontend Developer | React & TypeScript Expert"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={cv.about}
                    onChange={handleChange}
                    placeholder="Write a brief summary about yourself..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Save CV
                  </button>
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sections</h2>
              <div className="space-y-2">
                <button className="w-full py-2 px-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  + Add Experience
                </button>
                <button className="w-full py-2 px-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  + Add Education
                </button>
                <button className="w-full py-2 px-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  + Add Skills
                </button>
                <button className="w-full py-2 px-3 text-left border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  + Add Projects
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preview</h3>
              <div className="space-y-3 text-sm">
                {cv.fullName && (
                  <div>
                    <p className="text-lg font-bold">{cv.fullName}</p>
                  </div>
                )}
                {cv.headline && <p className="text-gray-600">{cv.headline}</p>}
                {(cv.email || cv.phone || cv.location) && (
                  <p className="text-gray-600">
                    {[cv.email, cv.phone, cv.location]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                )}
                {cv.about && (
                  <p className="text-gray-600 mt-3">{cv.about}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
