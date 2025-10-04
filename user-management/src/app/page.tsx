"use client";

import { useState, useEffect } from "react";
import { getUsers, User } from "@/lib/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const totalUsers = users.length;
  const activeUsers = Math.floor(totalUsers * 0.7);
  const newToday = Math.floor(totalUsers * 0.1);
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-light text-blue-400">
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
              <span className="text-2xl font-light text-indigo-400">
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
              <span className="text-2xl font-light text-purple-400">
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

        {/* <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-lg p-8 text-center">
          <h2 className="text-2xl font-light text-slate-700 mb-3">Get Started</h2>
          <p className="text-slate-600 mb-6 font-light">Begin your journey with our beautiful interface</p>
          <a href="/users" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-light rounded-2xl hover:shadow-xl hover:shadow-blue-300/25 transition-all duration-500 transform hover:-translate-y-1">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Manage Users
          </a>
        </div> */}
      </div>
    </div>
  );
}
