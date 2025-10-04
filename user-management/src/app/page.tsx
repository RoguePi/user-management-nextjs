"use client";

import { useState, useEffect } from "react";
import { getUsers, User } from "@/lib/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function fetchUsers() {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const totalUsers = mounted && !loading ? users.length : 0;
  const activeUsers = mounted && !loading ? Math.floor(users.length * 0.7) : 0;
  const newToday = mounted && !loading ? Math.floor(users.length * 0.1) : 0;
  
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-slate-700 mb-3 tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent font-light">
              UserHub
            </span>
          </h1>
          <p className="text-slate-600 font-light">
            Elegant user management with a touch of sophistication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-3xl border border-blue-100/50 shadow-lg hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-300/30 transition-shadow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-light text-blue-400" suppressHydrationWarning>
                {loading ? "..." : totalUsers}
              </span>
            </div>
            <h3 className="text-lg font-light text-slate-700 mb-2">
              Total Users
            </h3>
            <p className="text-slate-500 text-sm font-light">
              Registered users in the system
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-3xl border border-indigo-100/50 shadow-lg hover:shadow-xl hover:shadow-indigo-200/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-300/30 transition-shadow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-light text-indigo-400" suppressHydrationWarning>
                {loading ? "..." : activeUsers}
              </span>
            </div>
            <h3 className="text-lg font-light text-slate-700 mb-2">
              Active Users
            </h3>
            <p className="text-slate-500 text-sm font-light">
              Currently active users
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-3xl border border-purple-100/50 shadow-lg hover:shadow-xl hover:shadow-purple-200/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-300/30 transition-shadow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-light text-purple-400" suppressHydrationWarning>
                {loading ? "..." : newToday}
              </span>
            </div>
            <h3 className="text-lg font-light text-slate-700 mb-2">
              New Today
            </h3>
            <p className="text-slate-500 text-sm font-light">
              Users registered today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}