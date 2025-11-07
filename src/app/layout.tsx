import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UserHub - User Management",
  description: "Created by Rogelyn Pizon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <div className="flex h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <aside className="w-64 bg-gradient-to-b from-slate-700 to-slate-800 text-white border-r border-slate-600/30 shadow-2xl">
            <div className="p-6 border-b border-slate-600/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-light tracking-wide text-white">
                    UserHub
                  </h1>
                  <p className="text-xs text-slate-300 font-light">
                    User Management
                  </p>
                </div>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              <Link
                href="/"
                className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-600/50 transition-all duration-300"
              >
                <div className="w-4 h-4 text-slate-300 group-hover:text-blue-300 transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-light text-slate-200 group-hover:text-white transition-colors">
                  Dashboard
                </span>
              </Link>
              <Link
                href="/users"
                className="group flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-600/50 transition-all duration-300"
              >
                <div className="w-4 h-4 text-slate-300 group-hover:text-blue-300 transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-light text-slate-200 group-hover:text-white transition-colors">
                  Users
                </span>
              </Link>
            </nav>
          </aside>
          <main className="flex-1 overflow-auto bg-gradient-to-br from-white to-blue-50/30">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
