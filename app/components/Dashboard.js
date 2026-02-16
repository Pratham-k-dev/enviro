'use client'
import {  signOut } from 'next-auth/react'
import { useAuth } from './AuthProvider'
import { healthStore } from '@/lib/healthstore'
import { useState, useEffect } from 'react'
import { LogOut, Edit2, Heart, Wind, Cloud, Sun, AlertCircle, Leaf } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
//   const { user } = useAuth()
//   const {data:session}=useSession()
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [healthScore, setHealthScore] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const healthProfile = healthStore.getProfile()
    setProfile(healthProfile)

    // Calculate comprehensive health score based on profile
    if (healthProfile) {
      let score = 100

      // Deduct points based on conditions
      if (healthProfile.asthma) score -= 15
      if (healthProfile.heartDisease) score -= 20
      if (healthProfile.diabetes) score -= 15
      if (healthProfile.hypertension) score -= 10
      if (healthProfile.smoker) score -= 15
      if (healthProfile.obesity) score -= 10
      if (healthProfile.allergyType || healthProfile.hayfever) score -= 10
      if (healthProfile.skinSensitivity) score -= 5

      // Add points for healthy lifestyle
      if (healthProfile.outdoorActivityLevel === 'high') score += 5
      if (!healthProfile.smoker) score += 5

      setHealthScore(Math.max(Math.min(score, 100), 20))
    }
    setLoading(false)
  }, [])

  const handleLogout = async () => {
    // await supabase.auth.signOut()
    await signOut({ redirect: true, callbackUrl: '/' })
    healthStore.clearProfile()
    router.push('/')
  }

  const handleEditProfile = () => {
    router.push('/auth/health-profile')
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your health profile...</p>
        </div>
      </div>
    )
  }

  // Determine health score color and status
  const getScoreColor = () => {
    if (healthScore >= 80) return 'text-green-600'
    if (healthScore >= 60) return 'text-yellow-600'
    if (healthScore >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBgColor = () => {
    if (healthScore >= 80) return 'from-green-100 to-green-50'
    if (healthScore >= 60) return 'from-yellow-100 to-yellow-50'
    if (healthScore >= 40) return 'from-orange-100 to-orange-50'
    return 'from-red-100 to-red-50'
  }

  const getScoreStatus = () => {
    if (healthScore >= 80) return 'Excellent'
    if (healthScore >= 60) return 'Good'
    if (healthScore >= 40) return 'Fair'
    return 'Needs Attention'
  }

  const getRecommendations = () => {
    const recs = []

    if (profile.asthma) {
      recs.push({
        icon: Wind,
        title: 'Asthma Alert',
        description: 'Monitor air quality closely. Avoid strenuous outdoor activities on high pollution days.',
        severity: 'high',
        color: 'red',
      })
    }

    if (profile.allergyType || profile.hayfever) {
      recs.push({
        icon: Cloud,
        title: 'Pollen Sensitivity',
        description: 'High pollen season is approaching. Consider wearing a mask and keeping windows closed.',
        severity: 'medium',
        color: 'yellow',
      })
    }

    if (profile.skinSensitivity) {
      recs.push({
        icon: Sun,
        title: 'Skin Protection',
        description: 'Use SPF 50+ sunscreen daily. Reapply every 2 hours if outdoors.',
        severity: 'medium',
        color: 'yellow',
      })
    }

    if (profile.outdoorActivityLevel === 'high') {
      recs.push({
        icon: Sun,
        title: 'UV Protection',
        description: 'Apply SPF 50+ sunscreen. Wear protective clothing (hat, sunglasses) for outdoor activities.',
        severity: 'medium',
        color: 'yellow',
      })
    }

    if (profile.heartDisease || profile.hypertension) {
      recs.push({
        icon: Heart,
        title: 'Cardiovascular Health',
        description: 'Air pollution can strain your heart. Limit intense outdoor activities on high pollution days.',
        severity: 'high',
        color: 'red',
      })
    }

    if (profile.diabetes) {
      recs.push({
        icon: Heart,
        title: 'Metabolic Health',
        description: 'Stay active but avoid excessive heat exposure. Stay hydrated and monitor blood sugar levels.',
        severity: 'high',
        color: 'red',
      })
    }

    if (profile.smoker) {
      recs.push({
        icon: Wind,
        title: 'Air Quality Alert',
        description: 'Your respiratory system is already compromised. Avoid all outdoor activities in polluted areas.',
        severity: 'high',
        color: 'red',
      })
    }

    if (
      !profile.asthma &&
      !profile.allergyType &&
      !profile.heartDisease &&
      !profile.diabetes &&
      !profile.smoker
    ) {
      recs.push({
        icon: Heart,
        title: 'Great Health Profile',
        description: 'You have excellent health conditions! Continue outdoor activities and maintain a healthy lifestyle.',
        severity: 'low',
        color: 'green',
      })
    }

    return recs
  }

  const recommendations = getRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Welcome, {profile.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              📍 {profile.location} • {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Health Score Card */}
        <div className={`bg-gradient-to-br ${getScoreBgColor()} rounded-3xl shadow-xl p-8 md:p-12 mb-8 border-2 border-opacity-20`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-bold mb-2 uppercase tracking-wide">
                🏥 Today's Environmental Health Score
              </p>
              <p className={`text-6xl md:text-7xl font-bold ${getScoreColor()} mb-4`}>
                {healthScore}
              </p>
              <p className={`text-2xl font-semibold ${getScoreColor()} mb-4`}>
                Status: {getScoreStatus()}
              </p>
              <p className="text-gray-700 text-base max-w-lg">
                Your health score is calculated based on your medical conditions, lifestyle factors, and environmental sensitivities. A higher score means you're better positioned to handle environmental challenges.
              </p>
            </div>

            {/* Circular Score Display */}
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke={
                    healthScore >= 80
                      ? '#22c55e'
                      : healthScore >= 60
                      ? '#eab308'
                      : healthScore >= 40
                      ? '#f97316'
                      : '#ef4444'
                  }
                  strokeWidth="8"
                  strokeDasharray={`${(healthScore / 100) * 565} 565`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-5xl font-bold ${getScoreColor()}`}>
                    {healthScore}%
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Health Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Age Group</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{profile.age}</p>
                <p className="text-xs text-gray-500 mt-1">years old</p>
              </div>
              <Heart className="w-10 h-10 text-pink-500 opacity-40" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Activity Level</p>
                <p className="text-2xl font-bold text-gray-800 mt-2 capitalize">
                  {profile.outdoorActivityLevel}
                </p>
              </div>
              <Cloud className="w-10 h-10 text-blue-500 opacity-40" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Location</p>
                <p className="text-lg font-bold text-gray-800 mt-2">{profile.location}</p>
              </div>
              <Leaf className="w-10 h-10 text-green-500 opacity-40" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Health Status</p>
                <p className="text-lg font-bold text-gray-800 mt-2">{getScoreStatus()}</p>
              </div>
              <Sun className="w-10 h-10 text-yellow-500 opacity-40" />
            </div>
          </div>
        </div>

        {/* Health Conditions Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Conditions */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              Your Health Conditions
            </h2>
            <div className="space-y-3">
              {profile.asthma && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <Wind className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700 font-medium">Asthma</span>
                </div>
              )}
              {profile.heartDisease && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <Heart className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700 font-medium">Heart Disease</span>
                </div>
              )}
              {profile.hypertension && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <Heart className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700 font-medium">Hypertension</span>
                </div>
              )}
              {profile.diabetes && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700 font-medium">Diabetes</span>
                </div>
              )}
              {profile.allergyType || profile.hayfever ? (
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <Cloud className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Allergies / Hay Fever</span>
                </div>
              ) : null}
              {profile.smoker && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <Wind className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700 font-medium">Smoker/Smoke Exposure</span>
                </div>
              )}
              {profile.obesity && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700 font-medium">Overweight/Obesity</span>
                </div>
              )}
              {!profile.asthma &&
                !profile.heartDisease &&
                !profile.diabetes &&
                !profile.smoker && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <Heart className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700 font-medium">No major conditions reported</span>
                  </div>
                )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Stats</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-semibold">Environmental Risk</span>
                  <span className={`text-lg font-bold ${getScoreColor()}`}>
                    {healthScore >= 80
                      ? 'Low'
                      : healthScore >= 60
                      ? 'Moderate'
                      : healthScore >= 40
                      ? 'High'
                      : 'Very High'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      healthScore >= 80
                        ? 'bg-green-500'
                        : healthScore >= 60
                        ? 'bg-yellow-500'
                        : healthScore >= 40
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-3 font-semibold">Sensitivity Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.asthma && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      Air Quality
                    </span>
                  )}
                  {(profile.allergyType || profile.hayfever) && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                      Pollen
                    </span>
                  )}
                  {profile.outdoorActivityLevel === 'high' && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                      UV Index
                    </span>
                  )}
                  {profile.heartDisease && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      Pollution
                    </span>
                  )}
                  {profile.skinSensitivity && (
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                      Sun Exposure
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI-Powered Recommendations */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Leaf className="w-8 h-8 text-green-600" />
            Personalized Recommendations (AI-Generated)
          </h2>

          {recommendations.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((rec, idx) => {
                const Icon = rec.icon
                const severityColors = {
                  high: 'border-red-500 bg-red-50',
                  medium: 'border-yellow-500 bg-yellow-50',
                  low: 'border-green-500 bg-green-50',
                }
                return (
                  <div
                    key={idx}
                    className={`card-hover border-l-4 ${severityColors[rec.severity]}`}
                  >
                    <div className="flex items-start gap-4">
                      <Icon className={`w-8 h-8 flex-shrink-0 mt-1 ${
                        rec.severity === 'high'
                          ? 'text-red-600'
                          : rec.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {rec.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {rec.description}
                        </p>
                        <div className="mt-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            rec.severity === 'high'
                              ? 'bg-red-200 text-red-800'
                              : rec.severity === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                          }`}>
                            {rec.severity === 'high' ? '🔴 High Priority' : rec.severity === 'medium' ? '🟡 Medium Priority' : '🟢 Low Priority'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card bg-green-50 border-2 border-green-500 text-center py-12">
              <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Great News! 🎉</h3>
              <p className="text-green-700 text-lg">
                You have no specific health concerns. Keep maintaining your healthy lifestyle!
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
          <p className="text-blue-800 text-sm">
            <strong>📱 Note:</strong> This dashboard currently shows mock data and basic recommendations.
            Once you connect environmental APIs (OpenWeatherMap, AirNow, etc.), you'll receive real-time
            data on air quality, pollen levels, UV index, and weather conditions with AI-powered
            personalized actions based on your health profile.
          </p>
        </div>
      </div>
    </div>
  )
}