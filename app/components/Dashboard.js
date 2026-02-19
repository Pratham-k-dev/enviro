// 'use client'
// import {  signOut } from 'next-auth/react'
// import { useAuth } from './AuthProvider'
// import { healthStore } from '@/lib/healthstore'
// import { useState, useEffect } from 'react'
// import { LogOut, Edit2, Heart, Wind, Cloud, Sun, AlertCircle, Leaf } from 'lucide-react'
// import { supabase } from '@/lib/supabase'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'

// export default function Dashboard() {
// //   const { user } = useAuth()
//   const {data:session}=useSession()
//   const router = useRouter()
//   const [profile, setProfile] = useState(null)
//   const [healthScore, setHealthScore] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [dashboardData, setDashboardData] = useState({})
//   useEffect(() => {
//   if (!session?.user?.email) return

//   const loadDashboard = async () => {
//     try {
//       const res = await fetch("/api/dashboard")

//       const data = await res.json()

//       if (!res.ok) {
//         console.error("Dashboard API error:", data)
//         return
//       }

//       setDashboardData(data)
//       setHealthScore(data.score)
//       console.log(data.score)
//     } catch (err) {
//       console.error("Failed to load dashboard:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   loadDashboard()
// }, [session])

//   useEffect(() => {

//     // setProfile(healthProfile)

//     const loadProfile = async () => {
//     try {
//       // try cache first
//       // const cached = healthStore.getProfile()
//       // if (cached) {
//       //   setProfile(cached)
//       //   setLoading(false)
//       //   return
//       // }

//       // otherwise fetch from DB
//       const email = session?.user?.email   // or wherever you store it

//       const res = await fetch('/api/health_profile', {
//         headers: { 'x-user-email': email }
//       })

//       const data = await res.json()

//       // console.log(data.error,data.profile)

//       // if (!(data.profile)) {
//       //   router.push('/auth/health-profile')
//       //   return
//       // }

//       // cache it locally
//       healthStore.setProfile(data.profile)

//       setProfile(data.profile)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   loadProfile()
//   const healthProfile = healthStore.getProfile()


//     // Calculate comprehensive health score based on profile
//     // if (healthProfile) {
//     //   let score = 66

//     //   // Deduct points based on conditions
//     //   if (healthProfile.asthma) score -= 15
//     //   if (healthProfile.heartDisease) score -= 20
//     //   if (healthProfile.diabetes) score -= 15
//     //   if (healthProfile.hypertension) score -= 10
//     //   if (healthProfile.smoker) score -= 15
//     //   if (healthProfile.obesity) score -= 10
//     //   if (healthProfile.allergyType || healthProfile.hayfever) score -= 10
//     //   if (healthProfile.skinSensitivity) score -= 5

//     //   // Add points for healthy lifestyle
//     //   if (healthProfile.outdoorActivityLevel === 'high') score += 5
//     //   if (!healthProfile.smoker) score += 5

//     //   setHealthScore(Math.max(Math.min(score, 100), 20))
//     // }
//     setLoading(false)
//   }, [session])

//   const handleLogout = async () => {
//     // await supabase.auth.signOut()
//     await signOut({ redirect: true, callbackUrl: '/' })
//     healthStore.clearProfile()
//     router.push('/')
//   }

//   const handleEditProfile = () => {
//     router.push('/auth/health-profile')
//   }

//   if (loading || !profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-semibold">Loading your health profile...</p>
//         </div>
//       </div>
//     )
//   }

//   // Determine health score color and status
//   const getScoreColor = () => {
//     if (healthScore >= 80) return 'text-green-600'
//     if (healthScore >= 60) return 'text-yellow-600'
//     if (healthScore >= 40) return 'text-orange-600'
//     return 'text-red-600'
//   }

//   const getScoreBgColor = () => {
//     if (healthScore >= 80) return 'from-green-100 to-green-50'
//     if (healthScore >= 60) return 'from-yellow-100 to-yellow-50'
//     if (healthScore >= 40) return 'from-orange-100 to-orange-50'
//     return 'from-red-100 to-red-50'
//   }

//   const getScoreStatus = () => {
//     if (healthScore >= 80) return 'Excellent'
//     if (healthScore >= 60) return 'Good'
//     if (healthScore >= 40) return 'Fair'
//     return 'Needs Attention'
//   }

//   const getRecommendations = () => {
//     const recs = []

//     if (profile.asthma) {
//       recs.push({
//         icon: Wind,
//         title: 'Asthma Alert',
//         description: 'Monitor air quality closely. Avoid strenuous outdoor activities on high pollution days.',
//         severity: 'high',
//         color: 'red',
//       })
//     }

//     if (profile.allergyType || profile.hayfever) {
//       recs.push({
//         icon: Cloud,
//         title: 'Pollen Sensitivity',
//         description: 'High pollen season is approaching. Consider wearing a mask and keeping windows closed.',
//         severity: 'medium',
//         color: 'yellow',
//       })
//     }

//     if (profile.skinSensitivity) {
//       recs.push({
//         icon: Sun,
//         title: 'Skin Protection',
//         description: 'Use SPF 50+ sunscreen daily. Reapply every 2 hours if outdoors.',
//         severity: 'medium',
//         color: 'yellow',
//       })
//     }

//     if (profile.outdoorActivityLevel === 'high') {
//       recs.push({
//         icon: Sun,
//         title: 'UV Protection',
//         description: 'Apply SPF 50+ sunscreen. Wear protective clothing (hat, sunglasses) for outdoor activities.',
//         severity: 'medium',
//         color: 'yellow',
//       })
//     }

//     if (profile.heartDisease || profile.hypertension) {
//       recs.push({
//         icon: Heart,
//         title: 'Cardiovascular Health',
//         description: 'Air pollution can strain your heart. Limit intense outdoor activities on high pollution days.',
//         severity: 'high',
//         color: 'red',
//       })
//     }

//     if (profile.diabetes) {
//       recs.push({
//         icon: Heart,
//         title: 'Metabolic Health',
//         description: 'Stay active but avoid excessive heat exposure. Stay hydrated and monitor blood sugar levels.',
//         severity: 'high',
//         color: 'red',
//       })
//     }

//     if (profile.smoker) {
//       recs.push({
//         icon: Wind,
//         title: 'Air Quality Alert',
//         description: 'Your respiratory system is already compromised. Avoid all outdoor activities in polluted areas.',
//         severity: 'high',
//         color: 'red',
//       })
//     }

//     if (
//       !profile.asthma &&
//       !profile.allergyType &&
//       !profile.heartDisease &&
//       !profile.diabetes &&
//       !profile.smoker
//     ) {
//       recs.push({
//         icon: Heart,
//         title: 'Great Health Profile',
//         description: 'You have excellent health conditions! Continue outdoor activities and maintain a healthy lifestyle.',
//         severity: 'low',
//         color: 'green',
//       })
//     }

//     return recs
//   }

//   const recommendations = getRecommendations()

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
//           <div>
//             <h1 className="text-4xl md:text-5xl font-bold text-gradient">
//               Welcome, {profile.firstName}! 👋
//             </h1>
//             <p className="text-gray-600 mt-2 text-lg">
//               📍 {profile.location} • {new Date().toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={handleEditProfile}
//               className="flex items-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
//             >
//               <Edit2 className="w-5 h-5" />
//               Edit Profile
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold"
//             >
//               <LogOut className="w-5 h-5" />
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Health Score Card */}
//         <div className={`bg-gradient-to-br ${getScoreBgColor()} rounded-3xl shadow-xl p-8 md:p-12 mb-8 border-2 border-opacity-20`}>
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <div className="flex-1">
//               <p className="text-gray-600 text-sm font-bold mb-2 uppercase tracking-wide">
//                 🏥 Today's Environmental Health Score
//               </p>
//               <p className={`text-6xl md:text-7xl font-bold ${getScoreColor()} mb-4`}>
//                 {healthScore}
//               </p>
//               <p className={`text-2xl font-semibold ${getScoreColor()} mb-4`}>
//                 Status: {getScoreStatus()}
//               </p>
//               <p className="text-gray-700 text-base max-w-lg">
//                 Your health score is calculated based on your medical conditions, lifestyle factors, and environmental sensitivities. A higher score means you're better positioned to handle environmental challenges.
//               </p>
//             </div>

//             {/* Circular Score Display */}
//             <div className="relative w-40 h-40 md:w-48 md:h-48">
//               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
//                 {/* Background circle */}
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="90"
//                   fill="none"
//                   stroke="#e5e7eb"
//                   strokeWidth="8"
//                 />
//                 {/* Progress circle */}
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="90"
//                   fill="none"
//                   stroke={
//                     healthScore >= 80
//                       ? '#22c55e'
//                       : healthScore >= 60
//                       ? '#eab308'
//                       : healthScore >= 40
//                       ? '#f97316'
//                       : '#ef4444'
//                   }
//                   strokeWidth="8"
//                   strokeDasharray={`${(healthScore / 100) * 565} 565`}
//                   strokeLinecap="round"
//                   className="transition-all duration-1000"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <p className={`text-5xl font-bold ${getScoreColor()}`}>
//                     {healthScore}%
//                   </p>
//                   <p className="text-xs text-gray-600 mt-1">Health</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Key Health Metrics */}
//         <div className="grid md:grid-cols-4 gap-4 mb-8">
//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 font-semibold">Age Group</p>
//                 <p className="text-3xl font-bold text-gray-800 mt-2">{profile.age}</p>
//                 <p className="text-xs text-gray-500 mt-1">years old</p>
//               </div>
//               <Heart className="w-10 h-10 text-pink-500 opacity-40" />
//             </div>
//           </div>

//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 font-semibold">Activity Level</p>
//                 <p className="text-2xl font-bold text-gray-800 mt-2 capitalize">
//                   {profile.outdoorActivityLevel}
//                 </p>
//               </div>
//               <Cloud className="w-10 h-10 text-blue-500 opacity-40" />
//             </div>
//           </div>

//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 font-semibold">Location</p>
//                 <p className="text-lg font-bold text-gray-800 mt-2">{profile.location}</p>
//               </div>
//               <Leaf className="w-10 h-10 text-green-500 opacity-40" />
//             </div>
//           </div>

//           <div className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 font-semibold">Health Status</p>
//                 <p className="text-lg font-bold text-gray-800 mt-2">{getScoreStatus()}</p>
//               </div>
//               <Sun className="w-10 h-10 text-yellow-500 opacity-40" />
//             </div>
//           </div>
//         </div>

//         {/* Health Conditions Summary */}
//         <div className="grid md:grid-cols-2 gap-8 mb-8">
//           {/* Conditions */}
//           <div className="card">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//               <AlertCircle className="w-6 h-6 text-orange-500" />
//               Your Health Conditions
//             </h2>
//             <div className="space-y-3">
//               {profile.asthma && (
//                 <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
//                   <Wind className="w-5 h-5 text-red-600" />
//                   <span className="text-gray-700 font-medium">Asthma</span>
//                 </div>
//               )}
//               {profile.heartDisease && (
//                 <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
//                   <Heart className="w-5 h-5 text-red-600" />
//                   <span className="text-gray-700 font-medium">Heart Disease</span>
//                 </div>
//               )}
//               {profile.hypertension && (
//                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
//                   <Heart className="w-5 h-5 text-orange-600" />
//                   <span className="text-gray-700 font-medium">Hypertension</span>
//                 </div>
//               )}
//               {profile.diabetes && (
//                 <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
//                   <AlertCircle className="w-5 h-5 text-red-600" />
//                   <span className="text-gray-700 font-medium">Diabetes</span>
//                 </div>
//               )}
//               {profile.allergyType || profile.hayfever ? (
//                 <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
//                   <Cloud className="w-5 h-5 text-yellow-600" />
//                   <span className="text-gray-700 font-medium">Allergies / Hay Fever</span>
//                 </div>
//               ) : null}
//               {profile.smoker && (
//                 <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
//                   <Wind className="w-5 h-5 text-red-600" />
//                   <span className="text-gray-700 font-medium">Smoker/Smoke Exposure</span>
//                 </div>
//               )}
//               {profile.obesity && (
//                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
//                   <AlertCircle className="w-5 h-5 text-orange-600" />
//                   <span className="text-gray-700 font-medium">Overweight/Obesity</span>
//                 </div>
//               )}
//               {!profile.asthma &&
//                 !profile.heartDisease &&
//                 !profile.diabetes &&
//                 !profile.smoker && (
//                   <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
//                     <Heart className="w-5 h-5 text-green-600" />
//                     <span className="text-gray-700 font-medium">No major conditions reported</span>
//                   </div>
//                 )}
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="card">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Stats</h2>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-700 font-semibold">Environmental Risk</span>
//                   <span className={`text-lg font-bold ${getScoreColor()}`}>
//                     {healthScore >= 80
//                       ? 'Low'
//                       : healthScore >= 60
//                       ? 'Moderate'
//                       : healthScore >= 40
//                       ? 'High'
//                       : 'Very High'}
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full transition-all ${
//                       healthScore >= 80
//                         ? 'bg-green-500'
//                         : healthScore >= 60
//                         ? 'bg-yellow-500'
//                         : healthScore >= 40
//                         ? 'bg-orange-500'
//                         : 'bg-red-500'
//                     }`}
//                     style={{ width: `${healthScore}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="pt-4 border-t">
//                 <p className="text-sm text-gray-600 mb-3 font-semibold">Sensitivity Areas:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {profile.asthma && (
//                     <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
//                       Air Quality
//                     </span>
//                   )}
//                   {(profile.allergyType || profile.hayfever) && (
//                     <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
//                       Pollen
//                     </span>
//                   )}
//                   {profile.outdoorActivityLevel === 'high' && (
//                     <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
//                       UV Index
//                     </span>
//                   )}
//                   {profile.heartDisease && (
//                     <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
//                       Pollution
//                     </span>
//                   )}
//                   {profile.skinSensitivity && (
//                     <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
//                       Sun Exposure
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* AI-Powered Recommendations */}
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
//             <Leaf className="w-8 h-8 text-green-600" />
//             Personalized Recommendations (AI-Generated)
//           </h2>

//           {recommendations.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-6">
//               {recommendations.map((rec, idx) => {
//                 const Icon = rec.icon
//                 const severityColors = {
//                   high: 'border-red-500 bg-red-50',
//                   medium: 'border-yellow-500 bg-yellow-50',
//                   low: 'border-green-500 bg-green-50',
//                 }
//                 return (
//                   <div
//                     key={idx}
//                     className={`card-hover border-l-4 ${severityColors[rec.severity]}`}
//                   >
//                     <div className="flex items-start gap-4">
//                       <Icon className={`w-8 h-8 flex-shrink-0 mt-1 ${
//                         rec.severity === 'high'
//                           ? 'text-red-600'
//                           : rec.severity === 'medium'
//                           ? 'text-yellow-600'
//                           : 'text-green-600'
//                       }`} />
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-gray-800 mb-2">
//                           {rec.title}
//                         </h3>
//                         <p className="text-gray-700 leading-relaxed">
//                           {rec.description}
//                         </p>
//                         <div className="mt-3">
//                           <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//                             rec.severity === 'high'
//                               ? 'bg-red-200 text-red-800'
//                               : rec.severity === 'medium'
//                               ? 'bg-yellow-200 text-yellow-800'
//                               : 'bg-green-200 text-green-800'
//                           }`}>
//                             {rec.severity === 'high' ? '🔴 High Priority' : rec.severity === 'medium' ? '🟡 Medium Priority' : '🟢 Low Priority'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           ) : (
//             <div className="card bg-green-50 border-2 border-green-500 text-center py-12">
//               <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-green-800 mb-2">Great News! 🎉</h3>
//               <p className="text-green-700 text-lg">
//                 You have no specific health concerns. Keep maintaining your healthy lifestyle!
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Footer Note */}
//         <div className="mt-12 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
//           <p className="text-blue-800 text-sm">
//             <strong>📱 Note:</strong> This dashboard currently shows mock data and basic recommendations.
//             Once you connect environmental APIs (OpenWeatherMap, AirNow, etc.), you'll receive real-time
//             data on air quality, pollen levels, UV index, and weather conditions with AI-powered
//             personalized actions based on your health profile.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

//...................................................................

// 'use client'
// import { signOut } from 'next-auth/react'
// import { healthStore } from '@/lib/healthstore'
// import { useState, useEffect } from 'react'
// import { LogOut, Edit2, Heart, Wind, Cloud, Sun, AlertCircle, Leaf, MapPin, Droplets, Thermometer, Navigation } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import { getAQIInsight, getTempInsight,getUVInsight } from '@/lib/envInsights'
// import InsightCard from './InsightCard'
// export default function Dashboard() {
//   const { data: session } = useSession()
//   const router = useRouter()
//   const [profile, setProfile] = useState(null)
//   const [healthScore, setHealthScore] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [dashboardData, setDashboardData] = useState(null)
//   const [aqiInsight, setAqiInsight] = useState("")
//   const [uvInsight, setuvInsight] = useState("")
//   const [tempInsight, settempInsight] = useState("")

//   useEffect(() => {
//     if (!session?.user?.email) return

//     const loadData = async () => {
//       try {
//         setLoading(true)
//         // Fetch Dashboard Data (Env + Tips + Score)
//         const dashRes = await fetch("/api/dashboard")
//         const dashData = await dashRes.json()

//         // Fetch Profile Data
//         const profRes = await fetch('/api/health_profile', {
//           headers: { 'x-user-email': session.user.email }
//         })
//         const profData = await profRes.json()

//         if (dashRes.ok) {
//           setDashboardData(dashData)
//           setHealthScore(dashData.score)
//         }

//         if (profRes.ok && profData.profile) {
//           setProfile(profData.profile)
//           healthStore.setProfile(profData.profile)
//         }
//         const {env}=dashData
//         console.log("this is env:  ", env)
//         setAqiInsight(getAQIInsight(env.air.aqi))
//         setuvInsight(getUVInsight(env.uv.index))
//         settempInsight(getTempInsight(env.weather.temp))
//       } catch (err) {
//         console.error("Failed to load dashboard data:", err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadData()
//   }, [session])

//   const handleLogout = async () => {
//     await signOut({ redirect: true, callbackUrl: '/' })
//     healthStore.clearProfile()
//   }

//   if (loading || !profile || !dashboardData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-semibold">Analyzing local environment...</p>
//         </div>
//       </div>
//     )
//   }

//   const { env, tips } = dashboardData

//   // Helper for AQI Levels
//   const getAQIDesc = (aqi) => {
//     if (aqi <= 50) return { label: 'Good', color: 'text-green-600' }
//     if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-600' }
//     if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-600' }
//     return { label: 'Unhealthy', color: 'text-red-600' }
//   }

//   const getScoreColor = () => {
//     if (healthScore >= 80) return 'text-green-600'
//     if (healthScore >= 60) return 'text-yellow-600'
//     if (healthScore >= 40) return 'text-orange-600'
//     return 'text-red-600'
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800">
//               Welcome back, {profile.firstName}! 👋
//             </h1>
//             <div className="flex items-center gap-2 text-gray-600 mt-2">
//               <MapPin className="w-4 h-4 text-emerald-600" />
//               <span className="font-medium">{env.location || profile.location}</span>
//               <span className="mx-2">•</span>
//               <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
//             </div>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={() => router.push('/auth/health-profile')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm">
//               <Edit2 className="w-4 h-4" /> Edit Profile
//             </button>
//             <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-medium">
//               <LogOut className="w-4 h-4" /> Logout
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Main Score Card */}
//           <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-white p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-4 opacity-10">
//               <Heart className="w-32 h-32 text-emerald-500" />
//             </div>

//             <div className="relative w-48 h-48 flex-shrink-0">
//               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
//                 <circle
//                   cx="50" cy="50" r="45" fill="none"
//                   stroke="currentColor"
//                   strokeWidth="8"
//                   strokeDasharray={`${healthScore * 2.82} 282`}
//                   strokeLinecap="round"
//                   className={`transition-all duration-1000 ${getScoreColor()}`}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className={`text-5xl font-black ${getScoreColor()}`}>{healthScore}</span>
//                 <span className="text-gray-400 text-xs font-bold uppercase tracking-tighter">Safety Score</span>
//               </div>
//             </div>

//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">Environmental Compatibility</h2>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Based on your {profile.asthma ? 'respiratory sensitivity' : 'health profile'} and current {env.weather.condition.toLowerCase()} conditions in {env.location}.
//               </p>
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm">
//                 <Leaf className="w-4 h-4" /> Personalized for your {profile.outdoorActivityLevel} activity level
//               </div>
//             </div>
//           </div>

//           {/* Environmental Quick Stats */}
//           <div className="bg-white rounded-3xl shadow-sm border border-white p-6 grid grid-cols-2 gap-4">
//             <div className="p-4 bg-blue-50 rounded-2xl">
//               <Thermometer className="w-5 h-5 text-blue-500 mb-1" />
//               <p className="text-xs text-blue-600 font-bold uppercase">Temp</p>
//               <p className="text-xl font-bold text-gray-800">{Math.round(env.weather.temp)}°C</p>
//             </div>
//             <div className="p-4 bg-orange-50 rounded-2xl">
//               <Sun className="w-5 h-5 text-orange-500 mb-1" />
//               <p className="text-xs text-orange-600 font-bold uppercase">UV Index</p>
//               <p className="text-xl font-bold text-gray-800">{env.uv.index}</p>
//             </div>
//             <div className="p-4 bg-teal-50 rounded-2xl">
//               <Wind className="w-5 h-5 text-teal-500 mb-1" />
//               <p className="text-xs text-teal-600 font-bold uppercase">AQI</p>
//               <p className={`text-xl font-bold ${getAQIDesc(env.air.aqi).color}`}>{env.air.aqi}</p>
//             </div>
//             <div className="p-4 bg-indigo-50 rounded-2xl">
//               <Droplets className="w-5 h-5 text-indigo-500 mb-1" />
//               <p className="text-xs text-indigo-600 font-bold uppercase">Humidity</p>
//               <p className="text-xl font-bold text-gray-800">{env.weather.humidity}%</p>
//             </div>
//           </div>
//         </div>
//         {/* ================= INSIGHTS SECTION ================= */}
// <div className="mb-10">
//   <h2 className="text-2xl font-bold text-gray-800 mb-6">
//     Environmental Insights For You
//   </h2>

//   <div className="grid md:grid-cols-3 gap-6">

//     <InsightCard
//       title="Air Impact"
//       text={aqiInsight}
//       icon={<Wind className="w-5 h-5 text-teal-600" />}
//     />

//     <InsightCard
//       title="Sun Exposure"
//       text={uvInsight}
//       icon={<Sun className="w-5 h-5 text-orange-500" />}
//     />

//     <InsightCard
//       title="Temperature Stress"
//       text={tempInsight}
//       icon={<Thermometer className="w-5 h-5 text-blue-500" />}
//     />

//   </div>
// </div>


// {/* ================= RISK ZONES ================= */}
// <div className="mb-10">
//   <h2 className="text-2xl font-bold text-gray-800 mb-6">
//     Risk Zones Today
//   </h2>

//   <div className="grid md:grid-cols-2 gap-6">

//     {/* Health Risks */}
//     <div className="bg-white p-6 rounded-2xl shadow-sm border">
//       <h3 className="font-bold text-gray-800 mb-3">Health Risks</h3>
//       <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
//         {profile.asthma && env.air.aqi > 80 && (
//           <li>Air quality may trigger respiratory symptoms</li>
//         )}
//         {profile.heartDisease && env.air.aqi > 100 && (
//           <li>Pollution may stress cardiovascular system</li>
//         )}
//         {env.weather.humidity > 80 && (
//           <li>High humidity may worsen breathing comfort</li>
//         )}
//         {env.weather.temp > 38 && (
//           <li>Heat stress risk outdoors</li>
//         )}
//         {env.air.aqi <= 80 &&
//           env.weather.temp <= 38 &&
//           env.weather.humidity <= 80 && (
//           <li>No major health risks detected</li>
//         )}
//       </ul>
//     </div>

//     {/* Environmental Risks */}
//     <div className="bg-white p-6 rounded-2xl shadow-sm border">
//       <h3 className="font-bold text-gray-800 mb-3">Environmental Risks</h3>
//       <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
//         {env.air.aqi > 120 && <li>Air pollution levels elevated</li>}
//         {env.uv.index > 7 && <li>Strong UV radiation today</li>}
//         {env.weather.temp > 38 && <li>Extreme temperature conditions</li>}
//         {env.air.aqi <= 120 &&
//           env.uv.index <= 7 &&
//           env.weather.temp <= 38 && (
//           <li>Environment is within safe ranges</li>
//         )}
//       </ul>
//     </div>

//   </div>
// </div>


// {/* ================= AI ACTION PLAN ================= */}
// <div className="mb-10">
//   <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//     <AlertCircle className="w-6 h-6 text-emerald-600" />
//     AI Suggested Action Plan
//   </h2>

//   <div className="grid md:grid-cols-2 gap-6">

//     {[
//       env.air.aqi > 100 && "Limit prolonged outdoor exposure",
//       env.uv.index > 6 && "Use sunscreen and wear protective clothing",
//       env.weather.temp > 35 && "Increase water intake and rest intervals",
//       env.weather.humidity > 75 && "Prefer ventilated indoor spaces",
//       profile.asthma && env.air.aqi > 80 && "Carry inhaler when going out"
//     ]
//       .filter(Boolean)
//       .map((tip, idx) => (
//         <div
//           key={idx}
//           className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 flex gap-4"
//         >
//           <div className="bg-emerald-50 p-3 rounded-xl h-fit">
//             <Navigation className="w-5 h-5 text-emerald-600" />
//           </div>
//           <div>
//             <h3 className="font-bold text-gray-800 mb-1">Recommended Action</h3>
//             <p className="text-gray-600 text-sm">{tip}</p>
//           </div>
//         </div>
//       ))}

//   </div>
// </div>



//         {/* AI Recommendations Section */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <AlertCircle className="w-6 h-6 text-emerald-600" />
//             AI-Driven Health Recommendations
//           </h2>

//           <div className="grid md:grid-cols-2 gap-6">
//             {tips && tips.length > 0 ? (
//               tips.map((tip, idx) => (
//                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 flex gap-4 hover:shadow-md transition">
//                   <div className="bg-emerald-50 p-3 rounded-xl h-fit">
//                     <Navigation className="w-5 h-5 text-emerald-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-800 mb-1">Health Tip</h3>
//                     <p className="text-gray-600 text-sm leading-relaxed">{tip}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-2 bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center">
//                 <Leaf className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
//                 <p className="text-emerald-800 font-bold text-lg">Conditions are ideal for you today!</p>
//                 <p className="text-emerald-600">No specific warnings based on your health profile.</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Detailed Metrics Footer */}
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <h3 className="text-gray-500 text-sm font-bold uppercase mb-4">Pollutants</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">PM2.5</span>
//                 <span className="font-mono font-bold text-gray-800">{env.air.pm25 || 'N/A'}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">PM10</span>
//                 <span className="font-mono font-bold text-gray-800">{env.air.pm10 || 'N/A'}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//             <h3 className="text-gray-500 text-sm font-bold uppercase mb-4">Active Sensitivities</h3>
//             <div className="flex flex-wrap gap-2">
//               {profile.asthma && <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg">Asthma</span>}
//               {profile.heartDisease && <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-lg">Cardiac</span>}
//               {profile.smoker && <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">Lungs</span>}
//               {!profile.asthma && !profile.heartDisease && <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg">None Active</span>}
//             </div>
//           </div>

//           <div className="bg-emerald-900 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
//             <div className="relative z-10">
//               <h3 className="text-emerald-300 text-sm font-bold uppercase mb-2">Pro Tip</h3>
//               <p className="text-sm leading-relaxed opacity-90">
//                 Air quality is usually best in the early morning. Plan your {profile.outdoorActivityLevel} activities before 9 AM.
//               </p>
//             </div>
//             <Cloud className="absolute -bottom-4 -right-4 w-24 h-24 text-white opacity-10" />
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }
'use client'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LogOut, Edit2, Heart, Wind, Sun, AlertCircle, 
  Leaf, MapPin, Droplets, Thermometer, Navigation, 
  ShieldCheck, Zap, Activity, Clock, BookOpen, CheckCircle2 
} from 'lucide-react'
import { getAQIInsight, getUVInsight, calculateDashboardData } from '@/lib/healthEngine'

export default function Dashboard() {
  const { data: session } = useSession()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user?.email) return
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard")
        const json = await res.json()
        const logic = calculateDashboardData(json.env, json.profile)
        setData({ ...json, logic })
        setTimeout(() => setLoading(false), 1200) // Aesthetic delay
      } catch (e) { console.error(e) }
    }
    fetchData()
  }, [session])

  if (loading) return <LoadingScreen />

  const { env, profile, logic } = data

    const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
   
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* --- SECTION 1: HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Health-Env Sync</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Morning, {profile.first_name}.</h1>
            <p className="flex items-center gap-2 text-slate-500 font-medium mt-1">
              <MapPin size={16} className="text-emerald-500" /> {env.location}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/auth/health-profile')}  className="p-3 bg-white border rounded-2xl shadow-sm hover:bg-slate-50 transition"><Edit2 size={20}/></button>
            <button onClick={() => handleLogout} className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition"><LogOut size={20}/></button>
          </div>
        </header>

        {/* --- SECTION 2: THE SCORE & PLANNER --- */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Health Engine Card */}
          <motion.div whileHover={{ y: -5 }} className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            <div className="relative w-44 h-44 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle 
                  cx="50" cy="50" r="44" fill="none" stroke="url(#grad)" strokeWidth="8" 
                  strokeDasharray="276.46"
                  initial={{ strokeDashoffset: 276.46 }}
                  animate={{ strokeDashoffset: 276.46 - (logic.score * 2.76) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  strokeLinecap="round" 
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black">{logic.score}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety</span>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Bio-Environmental Link</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Your profile indicates <b>{profile.asthma ? 'respiratory sensitivity' : 'standard resistance'}</b>. Today's {env.weather.condition} conditions are cross-referenced below.
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider">Level: {profile.outdoor_activity_level}</div>
                {profile.asthma && <div className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[10px] font-bold uppercase tracking-wider">Asthma Profile</div>}
              </div>
            </div>
          </motion.div>

          {/* Activity Planner */}
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={14}/> Activity Windows
            </h3>
            <div className="space-y-3">
              <PlannerItem time="06:00 - 10:00" label="Morning" color="emerald" active={true} />
              <PlannerItem time="12:00 - 16:00" label="Afternoon" color="amber" active={false} />
              <PlannerItem time="18:00 - 21:00" label="Evening" color="blue" active={true} />
            </div>
          </div>
        </div>

        {/* --- SECTION 3: THE INSIGHTS GRID --- */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
           <InsightCard icon={<Wind/>} title="Air Quality" value={env.air.aqi} desc={getAQIInsight(env.air.aqi)} color="sky" />
           <InsightCard icon={<Sun/>} title="Sun Index" value={env.uv.index} desc={getUVInsight(env.uv.index)} color="yellow" />
           <InsightCard icon={<Thermometer/>} title="Temperature" value={`${env.weather.temp}°C`} desc="Thermal stress levels on heart/lungs." color="orange" />
           <InsightCard icon={<Droplets/>} title="Humidity" value={`${env.weather.humidity}%`} desc="Impact on sweat evaporation rate." color="indigo" />
        </div>

        {/* --- SECTION 4: SMART ANALYSIS & DID YOU KNOW --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="text-emerald-500"/> Personalized Medical Analysis</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {logic.aiInsights.map((ins, i) => (
                  <div key={i} className={`p-5 rounded-3xl ${ins.type === 'critical' ? 'bg-rose-50 border border-rose-100' : 'bg-slate-50'}`}>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{ins.title}</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{ins.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="flex items-center gap-2 font-bold mb-2 uppercase text-xs tracking-widest text-blue-200"><BookOpen size={16}/> Knowledge Base</h4>
                <p className="text-lg font-medium leading-relaxed italic">"{logic.fact}"</p>
              </div>
              <BookOpen size={120} className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400"><Navigation size={20}/> Action Plan</h3>
              <div className="space-y-4">
                {logic.actionPlan.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <p className="text-xs font-bold text-emerald-50">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Health Goal</p>
              <p className="text-xs text-emerald-100">Complete 30 mins of low-impact movement today.</p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

/* --- SUBCOMPONENTS --- */

function PlannerItem({ time, label, color, active }) {
  const colors = {
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
    amber: "text-amber-500 bg-amber-50 border-amber-100",
    blue: "text-blue-500 bg-blue-50 border-blue-100"
  }
  return (
    <div className={`p-4 rounded-2xl border flex items-center justify-between ${active ? colors[color] : 'bg-slate-50 border-slate-100 opacity-50'}`}>
      <div>
        <p className="text-[10px] font-black uppercase tracking-tighter">{label}</p>
        <p className="text-xs font-bold">{time}</p>
      </div>
      <div className={`w-2 h-2 rounded-full ${active ? 'animate-pulse bg-current' : 'bg-slate-300'}`} />
    </div>
  )
}

function InsightCard({ icon, title, value, desc, color }) {
  const colors = {
    sky: "bg-sky-50 text-sky-500 border-sky-100",
    yellow: "bg-yellow-50 text-yellow-500 border-yellow-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    indigo: "bg-indigo-50 text-indigo-500 border-indigo-100"
  }
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full">
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-4 shrink-0`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black mb-2">{value}</p>
      <p className="text-[11px] text-slate-500 leading-relaxed mt-auto font-medium">{desc}</p>
    </motion.div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" 
        />
        <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Loading Intelligence</p>
      </div>
    </div>
  )
}