"use client";

import { useState } from "react";
import SidebarLayout from "@/components/layout/SidebarLayout";

export default function InterviewPrep() {
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const categories = [
    "React",
    "TypeScript",
    "System Design",
    "Behavioral",
    "CSS",
    "JavaScript",
  ];

  const sampleQuestions = {
    React: [
      "What is the difference between functional and class components?",
      "Explain the concept of hooks and name 5 commonly used hooks.",
      "What is the virtual DOM and how does React use it?",
      "How does useEffect work and what is its dependency array?",
    ],
    TypeScript: [
      "What is the difference between 'interface' and 'type'?",
      "Explain generics and when you would use them.",
      "What are utility types and give examples?",
    ],
    "System Design": [
      "Design a frontend architecture for a large-scale application.",
      "How would you optimize a slow frontend application?",
      "Explain your approach to state management in a complex app.",
    ],
    Behavioral: [
      "Tell me about a time you had to work with a difficult team member.",
      "Describe a project where you took the initiative.",
      "How do you handle tight deadlines?",
    ],
  };

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interview Prep</h1>
          <p className="text-gray-600 mt-2">Prepare for your interviews with practice questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const categoryQuestions =
                        sampleQuestions[category as keyof typeof sampleQuestions] || [];
                      setQuestions(
                        categoryQuestions.map((q, i) => ({
                          id: i,
                          question: q,
                          category,
                          difficulty: ["Easy", "Medium", "Hard"][
                            Math.floor(Math.random() * 3)
                          ],
                          answer: "",
                          practiced: Math.floor(Math.random() * 2),
                        }))
                      );
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition"
                  >
                    <p className="font-medium">{category}</p>
                    <p className="text-sm text-gray-500">
                      {(sampleQuestions[category as keyof typeof sampleQuestions] || []).length} questions
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="lg:col-span-2">
            {questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
                    onClick={() => setSelectedInterview(q)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-semibold text-gray-900">{q.question}</p>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          q.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : q.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{q.category}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Practiced: {q.practiced} time{q.practiced !== 1 ? "s" : ""}
                      </p>
                      <button className="text-blue-600 hover:underline text-sm">
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">
                  Select a category to view interview questions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Question Detail Modal */}
        {selectedInterview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedInterview.question}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedInterview.category} • {selectedInterview.difficulty}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInterview(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Your Answer</h4>
                  <textarea
                    placeholder="Type your answer here..."
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Save Answer
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    Skip
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
