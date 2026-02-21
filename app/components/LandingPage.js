'use client'

import Link from 'next/link'
import {
  Cloud,
  Heart,
  Leaf,
  Activity,
  Wind,
  Brain,
  AlertTriangle,
  ShieldCheck,
  LineChart,
  UserCheck
} from 'lucide-react'

export default function LandingPage() {

  const coreFeatures = [
    {
      icon: Cloud,
      title: 'Environment Data Simplified',
      description: 'We convert complex AQI, PPM, UV index & pollutant data into easy-to-understand language.',
    },
    {
      icon: Brain,
      title: 'AI Environmental Analysis',
      description: 'Our AI analyzes real-time environmental patterns to detect potential risks.',
    },
    {
      icon: Heart,
      title: 'AI Personalized Health Suggestions',
      description: 'Smart recommendations tailored to your health conditions & symptoms.',
    },
    {
      icon: LineChart,
      title: 'Daily Risk Prediction',
      description: 'Predict your health risk for today based on environment + personal profile.',
    },
  ]

  const advancedFeatures = [
    {
      icon: ShieldCheck,
      title: 'Action Plan Strategies',
      description: 'Get step-by-step safety strategies for high pollution or UV days.',
    },
    {
      icon: UserCheck,
      title: 'AI Health Expert Assistant',
      description: 'A virtual environmental health expert guiding your daily decisions.',
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts & Warnings',
      description: 'Instant alerts when environmental levels become harmful.',
    },
    {
      icon: Activity,
      title: 'Environment Data Summarization',
      description: 'AI-generated daily summaries explaining what today’s data means for you.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">

      {/* NAVIGATION */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">EnviroHealth</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 rounded-full font-semibold border border-green-600 text-green-700 hover:bg-green-50 transition duration-300"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-28 px-4 text-center overflow-hidden">

        {/* INSERT IMAGE HERE */}
        <div className="absolute inset-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/011/882/180/small/world-health-day-global-health-awareness-concept-handmade-globe-inside-stethoscope-as-heart-shape-green-environment-to-love-and-care-photo.jpg"
            alt="Environment background"
            className="w-full h-full object-cover"
          />

          {/* Soft neutral overlay */}
          <div className="absolute inset-0 bg-white/40"></div>

          {/* Subtle gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Understand Your Environment.
            </span>
            <br />
            <span className="text-gray-800">Protect Your Health.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            AI-powered environmental intelligence that transforms complex pollution,
            UV, and climate data into personalized health insights.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              Get Started
            </Link>

            <button className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-green-600 text-green-700 bg-white/70 backdrop-blur hover:bg-green-50 hover:scale-105 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* AI SUMMARY DEMO */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-8 rounded-3xl shadow-xl">

            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Today’s AI Health Summary
            </h3>

            <div className="bg-white p-6 rounded-2xl shadow-md">
              <p className="text-gray-700">
                🌫 AQI: <strong>Moderate (110)</strong><br />
                ☀ UV Index: <strong>High</strong><br /><br />

                🔎 AI Insight: Sensitive individuals may experience mild discomfort.
                Consider limiting outdoor exposure between 12PM – 3PM.
              </p>

              <div className="mt-4 px-4 py-2 inline-block bg-green-600 text-white rounded-full text-sm">
                Risk Level: Medium
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-700">
            Powerful AI-Driven Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl backdrop-blur-lg bg-white/70 border border-green-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                >
                  <Icon className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ADVANCED FEATURES */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-50 to-green-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-green-800">
            Smart Protection System
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advancedFeatures.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl backdrop-blur-lg bg-white/80 border border-green-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                >
                  <Icon className="w-12 h-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ENVIRONMENT VISUAL SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold text-green-700 mb-6">
              Real-Time Environmental Intelligence
            </h2>
            <p className="text-gray-600 mb-4">
              We analyze pollution, UV radiation, pollen levels, and weather conditions
              using AI to predict how your body might respond.
            </p>
            <p className="text-gray-600">
              No more confusing ppm numbers — just simple health-focused guidance.
            </p>
          </div>

          <div>
            {/* INSERT IMAGE HERE */}
            <img
              src="/your-dashboard-preview.jpg"  // <-- INSERT IMAGE HERE
              alt="Dashboard preview"
              className="rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Make Smarter Health Decisions?
        </h2>
        <p className="mb-8 opacity-90">
          Join thousands protecting their health using AI-powered environmental insights.
        </p>
        <Link
          href="/auth/signup"
          className="px-8 py-4 rounded-full text-lg font-semibold bg-white text-green-700 shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
        >
          Create Your Health Profile
        </Link>
      </section>

    </div>
  )
}