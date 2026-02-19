'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, Heart, Wind, Eye, Activity } from 'lucide-react'
import { healthStore } from '@/lib/healthstore'

export default function HealthProfileForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    // Basic Info
    firstName: '',
    age: '',
    gender: '',
    location: '',

    // Respiratory
    asthma: false,
    allergyType: '',
    otherRespiratoryConditions: '',

    // Cardiovascular
    heartDisease: false,
    hypertension: false,
    otherCardiacConditions: '',

    // Metabolic & Lifestyle
    diabetes: false,
    obesity: false,
    smoker: false,

    // Sensitivity & Allergies
    hayfever: false,
    skinSensitivity: false,
    specificAllergens: '',

    // Lifestyle
    outdoorActivityLevel: 'moderate', // low, moderate, high
    workEnvironment: 'indoor', // indoor, outdoor, mixed
    exercise: false,
    exerciseFrequency: '',

    // General Health
    medications: '',
    otherConditions: '',
    healthConcerns: '',

    // Preferences
    notificationFrequency: 'daily', // real-time, daily, weekly
    dataUsageConsent: false,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validateStep = () => {
    const newErrors = {}

    if (step === 1) {
      if (!profile.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!profile.age || profile.age < 1 || profile.age > 120) newErrors.age = 'Valid age is required'
      if (!profile.gender) newErrors.gender = 'Gender is required'
      if (!profile.location.trim()) newErrors.location = 'Location is required'
    }

    if (step === 4) {
      if (!profile.dataUsageConsent) newErrors.dataUsageConsent = 'You must accept the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep()) {
      healthStore.setProfile(profile)

      const res = await fetch("/api/health_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
        })

        if(res.ok) router.push('/dashboard')
        else alert("Failed to save profile")
    }
  }

  const steps = [
    { num: 1, title: 'Basic Information', icon: Heart },
    { num: 2, title: 'Respiratory & Allergies', icon: Wind },
    { num: 3, title: 'Health Conditions', icon: Activity },
    { num: 4, title: 'Review & Confirm', icon: AlertCircle },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      step >= s.num
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className="text-sm font-medium text-center hidden md:block">
                    {s.title}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="card animate-fadeIn">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.firstName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    placeholder="25"
                    min="1"
                    max="120"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.age
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.gender
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-green-500'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location (City/Region) *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition ${
                      errors.location
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Respiratory & Allergies */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Respiratory & Allergies</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="asthma"
                      checked={profile.asthma}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="font-semibold text-gray-700">Do you have asthma?</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hayfever"
                      checked={profile.hayfever}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="font-semibold text-gray-700">Do you have hay fever?</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="skinSensitivity"
                      checked={profile.skinSensitivity}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="font-semibold text-gray-700">Skin sensitivity/dermatitis?</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specific allergens (if any)
                  </label>
                  <input
                    type="text"
                    name="specificAllergens"
                    value={profile.specificAllergens}
                    onChange={handleChange}
                    placeholder="e.g., pollen, dust, pet dander"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Other respiratory conditions
                  </label>
                  <textarea
                    name="otherRespiratoryConditions"
                    value={profile.otherRespiratoryConditions}
                    onChange={handleChange}
                    placeholder="e.g., COPD, chronic bronchitis"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Health Conditions */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Health Conditions & Lifestyle</h2>
              <div className="space-y-6">
                {/* Cardiovascular */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-gray-800">Cardiovascular Health</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="heartDisease"
                      checked={profile.heartDisease}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-gray-700">Heart disease</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="hypertension"
                      checked={profile.hypertension}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-gray-700">Hypertension (High blood pressure)</span>
                  </label>
                </div>

                {/* Metabolic */}
                <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-gray-800">Metabolic Health</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="diabetes"
                      checked={profile.diabetes}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-gray-700">Diabetes</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="obesity"
                      checked={profile.obesity}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-gray-700">Overweight/Obesity</span>
                  </label>
                </div>

                {/* Lifestyle */}
                <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-gray-800">Lifestyle</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="smoker"
                      checked={profile.smoker}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-gray-700">Smoker or exposed to smoke</span>
                  </label>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Outdoor Activity Level
                    </label>
                    <select
                      name="outdoorActivityLevel"
                      value={profile.outdoorActivityLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500"
                    >
                      <option value="low">Low (Mostly indoors)</option>
                      <option value="moderate">Moderate (Occasional outdoor activities)</option>
                      <option value="high">High (Frequent outdoor activities)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current medications (optional)
                  </label>
                  <textarea
                    name="medications"
                    value={profile.medications}
                    onChange={handleChange}
                    placeholder="List any medications you take"
                    rows="2"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Other health concerns (optional)
                  </label>
                  <textarea
                    name="otherConditions"
                    value={profile.otherConditions}
                    onChange={handleChange}
                    placeholder="Any other health conditions or concerns"
                    rows="2"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Profile</h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Profile Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <p><span className="font-semibold">Name:</span> {profile.firstName}</p>
                    <p><span className="font-semibold">Age:</span> {profile.age}</p>
                    <p><span className="font-semibold">Location:</span> {profile.location}</p>
                    <p><span className="font-semibold">Activity Level:</span> {profile.outdoorActivityLevel}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-2">What happens next?</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Your health profile will be securely stored</li>
                    <li>✓ Get personalized environmental health recommendations</li>
                    <li>✓ Receive alerts based on your specific health conditions</li>
                    <li>✓ Access real-time air quality, pollen, and UV index data</li>
                  </ul>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="dataUsageConsent"
                    checked={profile.dataUsageConsent}
                    onChange={handleChange}
                    className="w-5 h-5 text-green-600 rounded mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I understand my health profile will be used to provide personalized recommendations.
                    I agree to the privacy policy and terms of service.
                  </span>
                </label>
                {errors.dataUsageConsent && (
                  <p className="text-red-600 text-sm">{errors.dataUsageConsent}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn-secondary flex-1"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary flex-1"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary flex-1"
              >
                Create My Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}