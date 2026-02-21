'use client'

import AIChat from "../components/AIChat";
import { ChevronLeft, Brain, ShieldCheck, Activity, Zap, Cpu } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-semibold">Back to Dashboard</span>
          </Link>

          {/* AI Status Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              AI Agent Online
            </span>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT PANEL - AI IDENTITY & CONTEXT */}
          <div className="hidden lg:block space-y-6">

            {/* Agent Identity */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white">
                  <Brain size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    EnviroHealth AI
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Environmental Health Intelligence Agent
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                I analyze your personal health profile alongside real-time
                environmental exposure to predict risks and recommend
                preventive actions.
              </p>
            </div>

            {/* Active Intelligence Context */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Active Intelligence Context
              </h3>

              <div className="space-y-4 text-sm text-slate-700">

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" size={18} />
                  <span>Personal Health Conditions</span>
                </div>

                <div className="flex items-center gap-3">
                  <Activity className="text-blue-500" size={18} />
                  <span>Real-Time AQI & Chemical Pollutants</span>
                </div>

                <div className="flex items-center gap-3">
                  <Zap className="text-yellow-500" size={18} />
                  <span>UV Index & Weather Exposure</span>
                </div>

                <div className="flex items-center gap-3">
                  <Cpu className="text-indigo-500" size={18} />
                  <span>Risk Prediction Engine</span>
                </div>

              </div>
            </div>

            {/* Safety Reminder */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
                Safety Note
              </p>
              <p className="text-sm text-emerald-800">
                This AI provides preventive environmental health guidance. 
                It does not replace professional medical consultation.
              </p>
            </div>

          </div>

          {/* RIGHT PANEL - CHAT */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">

              {/* Chat Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white">
                    <Brain size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      EnviroHealth AI Agent
                    </p>
                    <p className="text-xs text-slate-500">
                      Personalized Risk Analysis Mode
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-emerald-600">
                  Secure Session
                </span>
              </div>

              {/* Chat Component */}
              <div className="flex-1 p-4">
                <AIChat />
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}