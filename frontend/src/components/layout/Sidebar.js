"use client";

import { Settings, X } from "lucide-react";
import SettingsPanel from "../settings/SettingsPanel";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl shadow-stone-900/10 flex flex-col
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-stone-900 text-base leading-tight">
                Settings
              </h2>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase">
                Customize your experience
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-all duration-200"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <SettingsPanel />
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3 border-t border-stone-100 bg-stone-50/50">
          <p className="text-[10px] text-stone-400 text-center">
            Settings are saved automatically in your browser
          </p>
        </div>
      </aside>
    </>
  );
}