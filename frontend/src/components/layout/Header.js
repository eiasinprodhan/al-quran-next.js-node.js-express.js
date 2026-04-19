"use client";

import { BookOpen, Menu, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "./Sidebar";

const NAV = [
  { href: "/", label: "Surahs", icon: BookOpen },
  { href: "/search", label: "Search", icon: Search },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-500" />

        <div className="bg-white/80 backdrop-blur-xl border-b border-stone-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-105">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent leading-tight">
                    QuranApp
                  </h1>
                  <p className="text-[10px] text-stone-400 font-medium tracking-[0.2em] uppercase -mt-0.5">
                    Noble Quran
                  </p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 rounded-2xl p-1.5">
                {NAV.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active(href)
                        ? "bg-white text-emerald-700 shadow-sm shadow-stone-200/50"
                        : "text-stone-500 hover:text-stone-800 hover:bg-white/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="relative p-2.5 rounded-xl text-stone-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 group"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <button
                  className="md:hidden p-2.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all duration-200"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Menu"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden border-t border-stone-100 bg-white/90 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                {NAV.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active(href)
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        active(href)
                          ? "bg-emerald-100"
                          : "bg-stone-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}