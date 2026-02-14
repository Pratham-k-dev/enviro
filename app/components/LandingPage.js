'use client'

import Link from 'next/link'
import { Cloud, Heart, Leaf, Activity, Wind, Droplets } from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Cloud,
      title: 'Air Quality Monitoring',
      description: 'Real-time AQI, pollen, and pollution data',
    },
    {
      icon: Heart,
      title: 'Health Tracking',
      description: 'Track your health conditions and symptoms',
    },
    {
      icon: Activity,
      title: 'Personalized Recommendations',
      description: 'AI-powered suggestions based on your health profile',
    },
    {
      icon: Wind,
      title: 'UV & Weather',
      description: 'UV index and weather forecasts for your safety',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gradient">EnviroHealth</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login" className="btn-secondary">
              Login
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Breathe Smarter.</span>
            <br />
            <span className="text-gray-800">Live Healthier.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized environmental health insights tailored to your unique health profile. Make informed decisions about your outdoor activities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/signup" className="btn-primary">
              Start Free Trial
            </Link>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/40 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
            Why Choose EnviroHealth?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="card-hover animate-slideInLeft" style={{ animationDelay: `${idx * 100}ms` }}>
                  <Icon className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="card">
              <div className="text-4xl font-bold text-gradient mb-2">50k+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-gradient mb-2">100+</div>
              <p className="text-gray-600">Cities Covered</p>
            </div>
            <div className="card">
              <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
              <p className="text-gray-600">Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of people making smarter decisions about their environment
          </p>
          <Link href="/auth/signup" className="btn-primary bg-white text-green-600 hover:bg-gray-50">
            Create Your Health Profile
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6" />
                <span className="font-bold">EnviroHealth</span>
              </div>
              <p className="text-gray-400 text-sm">Your personal environmental health companion</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 EnviroHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}