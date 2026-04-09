"use client";

import SidebarLayout from "@/components/layout/SidebarLayout";

export default function Settings() {
  return (
    <SidebarLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <hr />

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-gray-700">Job alerts</span>
              </label>
            </div>
          </div>

          <hr />

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Danger Zone</h2>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
