
// 'use client'
// import { signOut, useSession } from 'next-auth/react'
// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   LogOut, Edit2, Heart, Wind, Sun, AlertCircle,
//   Leaf, MapPin, Droplets, Thermometer, Navigation,
//   ShieldCheck, Zap, Activity, Clock, BookOpen, CheckCircle2,
//   AlertTriangle, Factory, Microscope, Info, ArrowRight, ShieldAlert
// } from 'lucide-react'
// import { getAQIInsight, getUVInsight, calculateDashboardData, POLLUTANT_DEFINITIONS } from '@/lib/healthEngine'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// // import HotspotMap from './Hotspot'

// export default function Dashboard() {
//   const { data: session } = useSession()
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     if (!session?.user?.email) return
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/dashboard")
//         const json = await res.json()
//         const logic = calculateDashboardData(json.env, json.profile)
//         setData({ ...json, logic })
        
//         setTimeout(() => setLoading(false), 1200)
//       } catch (e) { 
//         console.error(e)
//         setLoading(false) // Stop loading even on error to prevent infinite loop
//       }
//     }
//     fetchData()
//   }, [session])

//   if (loading || !data) return <LoadingScreen />

//   // Safety fallbacks to prevent "undefined" crashes
//   const env = data?.env || {}
//   const profile = data?.profile || {}
//   const logic = data?.logic || { aiInsights: [], actionPlan: [], score: 0 }

//   const handleLogout = async () => {
//     await signOut({ redirect: true, callbackUrl: '/' })
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafb] text-slate-900 py-8 px-4 relative overflow-hidden">
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] -z-10" />
//       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-6xl mx-auto space-y-8"
//       >
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
//               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
//               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Health-Env Sync</span>
//             </div>
//             <h1 className="text-4xl font-black tracking-tight">Welcome, {profile?.first_name || 'User'}.</h1>
//             <p className="flex items-center gap-2 text-slate-500 font-medium mt-1">
//               <MapPin size={16} className="text-emerald-500" /> {env?.location || 'Unknown Location'}
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <button onClick={() => router.push('/auth/health-profile')} className="p-3 bg-white border rounded-2xl shadow-sm hover:bg-slate-50 transition"><Edit2 size={20} /></button>
//             <button onClick={handleLogout} className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition"><LogOut size={20} /></button>
//           </div>
//         </header>

//         <div className="grid lg:grid-cols-3 gap-6">
//           <motion.div whileHover={{ y: -5 }} className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
//             <div className="relative w-44 h-44 shrink-0">
//               <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
//                 <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
//                 <motion.circle
//                   cx="50" cy="50" r="44" fill="none" stroke="url(#grad)" strokeWidth="8"
//                   strokeDasharray="276.46"
//                   initial={{ strokeDashoffset: 276.46 }}
//                   animate={{ strokeDashoffset: 276.46 - ((logic?.score || 0) * 2.76) }}
//                   transition={{ duration: 2, ease: "easeOut" }}
//                   strokeLinecap="round"
//                 />
//                 <defs>
//                   <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
//                     <stop offset="0%" stopColor="#10b981" />
//                     <stop offset="100%" stopColor="#3b82f6" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className="text-5xl font-black">{logic?.score || 0}</span>
//                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety</span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <h2 className="text-2xl font-bold">Bio-Environmental Link</h2>
//               <p className="text-slate-500 text-sm leading-relaxed max-w-md">
//                 Your profile indicates <b>{profile?.asthma ? 'respiratory sensitivity' : 'standard resistance'}</b>. Today's {env?.weather?.condition || 'current'} conditions are cross-referenced below.
//               </p>
//               <div className="flex gap-2">
//                 <div className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider">Level: {profile?.outdoor_activity_level || 'Normal'}</div>
//                 {profile?.asthma && <div className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[10px] font-bold uppercase tracking-wider">Asthma Profile</div>}
//               </div>
//             </div>
//           </motion.div>

//           <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
//               <Clock size={14} /> Activity Windows
//             </h3>
//             <div className="space-y-3">
//               <PlannerItem time="06:00 - 10:00" label="Morning" color="emerald" active={true} />
//               <PlannerItem time="12:00 - 16:00" label="Afternoon" color="amber" active={false} />
//               <PlannerItem time="18:00 - 21:00" label="Evening" color="blue" active={true} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
//           <div>
//             <h3 className="font-bold text-slate-800 text-lg">Personalized AI Insights</h3>
//             <p className="text-slate-500 text-sm mt-2">Get a detailed breakdown of how today's air quality affects your specific respiratory conditions.</p>
//           </div>
//           <Link href="/chat">
//             <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
//               Chat with Health AI <ArrowRight size={18} />
//             </button>
//           </Link>
//         </div>

//         <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
//           <InsightCard icon={<Wind />} title="Air Quality" value={env?.air?.aqi || 0} desc={getAQIInsight(env?.air?.aqi || 0)} color="sky" />
//           <InsightCard icon={<Sun />} title="Sun Index" value={env?.uv?.index || 0} desc={getUVInsight(env?.uv?.index || 0)} color="yellow" />
//           <InsightCard icon={<Thermometer />} title="Temperature" value={`${env?.weather?.temp || 0}°C`} desc="Thermal stress levels on heart/lungs." color="orange" />
//           <InsightCard icon={<Droplets />} title="Humidity" value={`${env?.weather?.humidity || 0}%`} desc="Impact on sweat evaporation rate." color="indigo" />
//         </div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Microscope className="text-indigo-500" /> Chemical Hazard Analysis</h3>
//             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">Live Lab Scan</span>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Object.keys(POLLUTANT_DEFINITIONS).map((key) => {
//               const info = POLLUTANT_DEFINITIONS[key];
//               const value = env?.air?.[key] || 0; // FIXED: Added optional chaining here

//               return (
//                 <motion.div key={key} whileHover={{ y: -5 }} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-all">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="bg-slate-50 p-3 rounded-2xl text-indigo-600">{key === 'so2' ? <Factory size={20} /> : <Wind size={20} />}</div>
//                     <div className="text-right">
//                       <p className="text-[10px] font-black text-slate-400 uppercase">{info.name}</p>
//                       <p className="text-xl font-black text-slate-900">{value} <span className="text-xs font-medium text-slate-400">μg/m³</span></p>
//                     </div>
//                   </div>
//                   <h4 className="font-bold text-slate-800 text-sm mb-1">{info.alias}</h4>
//                   <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{info.description}</p>
//                   <div className="mt-auto space-y-3">
//                     <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
//                       <p className="text-[9px] font-black text-amber-600 uppercase flex items-center gap-1"><Info size={10} /> Likely Source</p>
//                       <p className="text-[11px] text-amber-800 font-medium">{info.hazard}</p>
//                     </div>
//                     <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
//                       <p className="text-[9px] font-black text-rose-600 uppercase flex items-center gap-1"><ShieldAlert size={10} /> Biological Impact</p>
//                       <p className="text-[11px] text-rose-900 font-bold leading-tight">{info.impact(profile)}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
//               <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="text-emerald-500" /> Personalized Medical Analysis</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {logic?.aiInsights?.map((ins, i) => (
//                   <div key={i} className={`p-5 rounded-3xl ${ins.type === 'critical' ? 'bg-rose-50 border border-rose-100' : 'bg-slate-50'}`}>
//                     <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{ins.title}</p>
//                     <p className="text-xs text-slate-600 leading-relaxed font-medium">{ins.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
//               <div className="relative z-10">
//                 <h4 className="flex items-center gap-2 font-bold mb-2 uppercase text-xs tracking-widest text-blue-200"><BookOpen size={16} /> Knowledge Base</h4>
//                 <p className="text-lg font-medium leading-relaxed italic">"{logic?.fact || 'Loading fact...'}"</p>
//               </div>
//               <BookOpen size={120} className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform" />
//             </div>
//           </div>

//           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between">
//             <div>
//               <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400"><Navigation size={20} /> Action Plan</h3>
//               <div className="space-y-4">
//                 {logic?.actionPlan?.map((tip, i) => (
//                   <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/5">
//                     <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
//                     <p className="text-xs font-bold text-emerald-50">{tip}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
//               <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Health Goal</p>
//               <p className="text-xs text-emerald-100">Complete 30 mins of low-impact movement today.</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// // ... PlannerItem, InsightCard, LoadingScreen remain exactly as you had them

// // /* --- SUBCOMPONENTS --- */

// function PlannerItem({ time, label, color, active }) {
//   const colors = {
//     emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
//     amber: "text-amber-500 bg-amber-50 border-amber-100",
//     blue: "text-blue-500 bg-blue-50 border-blue-100"
//   }
//   return (
//     <div className={`p-4 rounded-2xl border flex items-center justify-between ${active ? colors[color] : 'bg-slate-50 border-slate-100 opacity-50'}`}>
//       <div>
//         <p className="text-[10px] font-black uppercase tracking-tighter">{label}</p>
//         <p className="text-xs font-bold">{time}</p>
//       </div>
//       <div className={`w-2 h-2 rounded-full ${active ? 'animate-pulse bg-current' : 'bg-slate-300'}`} />
//     </div>
//   )
// }

// function InsightCard({ icon, title, value, desc, color }) {
//   const colors = {
//     sky: "bg-sky-50 text-sky-500 border-sky-100",
//     yellow: "bg-yellow-50 text-yellow-500 border-yellow-100",
//     orange: "bg-orange-50 text-orange-500 border-orange-100",
//     indigo: "bg-indigo-50 text-indigo-500 border-indigo-100"
//   }
//   return (
//     <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full">
//       <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-4 shrink-0`}>
//         {icon}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
//       <p className="text-2xl font-black mb-2">{value}</p>
//       <p className="text-[11px] text-slate-500 leading-relaxed mt-auto font-medium">{desc}</p>
//     </motion.div>
//   )
// }

// function LoadingScreen() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="flex flex-col items-center gap-4">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//           className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
//         />
//         <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Loading Intelligence</p>
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
  ShieldCheck, Zap, Activity, Clock, BookOpen, CheckCircle2,
  AlertTriangle, Factory, Microscope, Info, ArrowRight, ShieldAlert,
  Eye, Gauge, Flame, CloudRain, Waves, TrendingUp, Brain, Lungs,
  ChevronRight, Skull, Bug, TreePine
} from 'lucide-react'
import { getAQIInsight, getUVInsight, calculateDashboardData, POLLUTANT_DEFINITIONS } from '@/lib/healthEngine'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ─── Hardcoded AI Analysis Insights ───────────────────────────────────────────
const HARDCODED_INSIGHTS = [
  {
    title: "Asthma Risk — Elevated",
    type: "critical",
    icon: "🫁",
    text: "Since you have asthma, today's AQI may trigger bronchospasm. PM2.5 particles are small enough to bypass your airway defenses. Carry your rescue inhaler at all times.",
    condition: "asthma",
  },
  {
    title: "Dust Allergy Alert",
    type: "critical",
    icon: "🌫️",
    text: "Since you have dust allergies, airborne particulate matter (PM10) can induce histamine release — causing sneezing, watery eyes, and nasal congestion. Avoid outdoor areas near construction sites today.",
    condition: "dust_allergy",
  },
  {
    title: "Pollen Sensitivity — Moderate",
    type: "warning",
    icon: "🌿",
    text: "Since you have pollen allergies, tree and grass pollen counts are moderate today. Wind dispersal is high — wearing wraparound sunglasses outdoors significantly reduces ocular exposure.",
    condition: "pollen_allergy",
  },
  {
    title: "Cardiovascular Load",
    type: "info",
    icon: "❤️",
    text: "High humidity (>75%) increases cardiac effort by 15-20%. If you have heart conditions, today's thermal index demands reduced exertion during peak hours (12–4 PM).",
    condition: null,
  },
  {
    title: "Lung Capacity Reduction",
    type: "critical",
    icon: "🔬",
    text: "Combined ozone + NO₂ exposure at today's levels can reduce forced lung capacity (FVC) by up to 10% for sensitive individuals. Since you have asthma, this compounds your existing bronchial restriction.",
    condition: "asthma",
  },
  {
    title: "Skin & Eye UV Exposure",
    type: "warning",
    icon: "☀️",
    text: "UV Index above 6 causes DNA damage to skin cells within 30 minutes of unprotected exposure. Use SPF 50+ and UV-blocking eyewear when outdoors.",
    condition: null,
  },
]

// ─── Hardcoded Action Plan ─────────────────────────────────────────────────────
const HARDCODED_ACTIONS = [
  "Set air purifier to HIGH (HEPA mode) — recommended for AQI > 100 conditions indoors",
  "Keep windows sealed between 11 AM – 4 PM when ozone peaks near surface level",
  "Use N95 or KN95 mask if commuting or exercising outdoors today",
  "Run a cool-mist humidifier if indoor humidity drops below 40% — helps airways",
  "Take antihistamine 30 mins before any outdoor exposure (dust/pollen sensitive profiles)",
  "Hydrate aggressively — 3L water minimum to help lungs clear particulate matter",
  "Schedule outdoor exercise for 6–8 AM window when pollutants are lowest",
  "Avoid candles, incense, or cooking fumes indoors — adds to particulate load",
]

// ─── Extra Environment Components ─────────────────────────────────────────────
const EXTRA_ENV = [
  {
    icon: <CloudRain size={22} />,
    title: "Precipitation",
    value: "12%",
    color: "violet",
    shortDesc: "Chance of rain",
    explainer: "Rain washes PM2.5 from the air, temporarily improving AQI. Low chance today means no natural air cleansing.",
    detail: "Rain scavenges airborne pollutants by binding to water droplets. On dry days, particulates stay suspended longer, raising inhalation risk.",
  },
  {
    icon: <Wind size={22} />,
    title: "Wind Speed",
    value: "14 km/h",
    color: "teal",
    shortDesc: "Moderate dispersion",
    explainer: "Moderate wind disperses local pollutants but also spreads pollen farther from source areas.",
    detail: "Wind speed determines how quickly pollutants disperse. Below 10 km/h creates stagnant air; above 20 km/h can spike pollen counts.",
  },
  {
    icon: <Eye size={22} />,
    title: "Visibility",
    value: "8.2 km",
    color: "slate",
    shortDesc: "Reduced by haze",
    explainer: "Reduced visibility is a direct indicator of fine particle (PM2.5/PM10) concentration in the air column.",
    detail: "Visibility below 10 km typically indicates elevated particulate pollution. Haze is your eye's early warning system.",
  },
  {
    icon: <Gauge size={22} />,
    title: "Air Pressure",
    value: "1013 hPa",
    color: "rose",
    shortDesc: "Normal atmospheric",
    explainer: "Stable pressure traps pollutants near ground level. Dropping pressure usually signals incoming rain that clears the air.",
    detail: "High pressure systems trap air near the surface, concentrating pollutants. Low pressure systems create updrafts that lift and disperse them.",
  },
]

// ─── Hardcoded Chemical Hazards ───────────────────────────────────────────────
const HARDCODED_CHEMICALS = [
  {
    key: "PM2.5",
    name: "PM₂.₅",
    alias: "Fine Particulate Matter",
    value: 38,
    unit: "μg/m³",
    icon: <Microscope size={20} />,
    source: "Vehicle exhaust, industrial combustion, biomass burning",
    impact: "Since you have asthma: PM2.5 penetrates deep alveoli causing inflammation and potential permanent scarring with chronic exposure.",
    level: "moderate",
  },
  {
    key: "PM10",
    name: "PM₁₀",
    alias: "Coarse Particles / Dust",
    value: 62,
    unit: "μg/m³",
    icon: <Wind size={20} />,
    source: "Construction dust, road resuspension, agricultural activity",
    impact: "Since you have dust allergies: PM10 triggers IgE-mediated histamine response — rhinitis, conjunctivitis, and throat irritation are likely.",
    level: "high",
  },
  {
    key: "O3",
    name: "O₃",
    alias: "Ground-Level Ozone",
    value: 74,
    unit: "μg/m³",
    icon: <Zap size={20} />,
    source: "Formed by sunlight reacting with NOx from vehicles and industry",
    impact: "Ozone is a powerful oxidant that reacts with lung tissue on contact. Asthmatics experience 2× higher sensitivity than the general population.",
    level: "high",
  },
  {
    key: "NO2",
    name: "NO₂",
    alias: "Nitrogen Dioxide",
    value: 41,
    unit: "μg/m³",
    icon: <Factory size={20} />,
    source: "Traffic emissions, power plants, gas stoves indoors",
    impact: "NO₂ inflames the lining of the lungs. Since you have asthma, it increases susceptibility to respiratory infections by 30%.",
    level: "moderate",
  },
  {
    key: "SO2",
    name: "SO₂",
    alias: "Sulphur Dioxide",
    value: 18,
    unit: "μg/m³",
    icon: <Factory size={20} />,
    source: "Coal burning, smelters, diesel engines",
    impact: "SO₂ converts to sulfuric acid in humid lungs. Pollen-allergic individuals experience heightened mast cell degranulation.",
    level: "low",
  },
  {
    key: "CO",
    name: "CO",
    alias: "Carbon Monoxide",
    value: 0.8,
    unit: "mg/m³",
    icon: <Skull size={20} />,
    source: "Incomplete fuel combustion, vehicle idling, generators",
    impact: "CO binds hemoglobin 200× more readily than oxygen. Even low levels cause cognitive fatigue and reduce athletic performance.",
    level: "low",
  },
]

const LEVEL_STYLES = {
  low: { badge: "bg-emerald-50 text-emerald-700 border-emerald-100", bar: "bg-emerald-400", width: "w-1/4" },
  moderate: { badge: "bg-amber-50 text-amber-700 border-amber-100", bar: "bg-amber-400", width: "w-1/2" },
  high: { badge: "bg-rose-50 text-rose-700 border-rose-100", bar: "bg-rose-500", width: "w-3/4" },
}

// ─── ENV Card Metadata ─────────────────────────────────────────────────────────
const ENV_META = {
  aqi: {
    explainer: "Air Quality Index (AQI) measures how clean or polluted outdoor air is. Scale: 0–50 Good, 51–100 Moderate, 101–150 Unhealthy for sensitive groups, 151+ Unhealthy.",
    detail: "AQI is calculated from PM2.5, PM10, O₃, NO₂, SO₂, and CO readings. A single spike in any pollutant can push the overall index into dangerous territory.",
  },
  uv: {
    explainer: "UV Index quantifies ultraviolet radiation intensity from the sun. Scale: 0–2 Low, 3–5 Moderate, 6–7 High, 8–10 Very High, 11+ Extreme.",
    detail: "UV rays cause DNA mutations in skin cells (UVB) and penetrate deeper tissue (UVA). Corneal damage can occur within minutes at high UV levels.",
  },
  temp: {
    explainer: "Temperature directly affects how your body regulates heat and how hard your cardiovascular system has to work to maintain core body temperature.",
    detail: "Above 35°C, sweat evaporation becomes inefficient. For asthma patients, hot-dry air dehydrates airway mucosa, worsening bronchial hyperreactivity.",
  },
  humidity: {
    explainer: "Relative humidity is the water vapor in air as a percentage of maximum it can hold. 40–60% RH is the ideal human health range.",
    detail: "High humidity promotes mold spore and dust mite proliferation — major asthma and allergy triggers. Low humidity dries out nasal passages reducing pathogen filtration.",
  },
}

// ─── Activity Window Data ──────────────────────────────────────────────────────
const ACTIVITY_WINDOWS = [
  {
    time: "06:00 – 09:00",
    label: "Morning",
    emoji: "🌅",
    quality: "Best",
    color: "emerald",
    active: true,
    tips: ["Low ozone", "Cool temps", "Light pollen"],
    recommendation: "Ideal for outdoor walks, cycling, or yoga",
  },
  {
    time: "10:00 – 14:00",
    label: "Midday",
    emoji: "☀️",
    quality: "Avoid",
    color: "rose",
    active: false,
    tips: ["Peak UV", "Ozone surge", "High heat"],
    recommendation: "Stay indoors — highest pollutant + UV combination",
  },
  {
    time: "15:00 – 17:00",
    label: "Afternoon",
    emoji: "🌤️",
    quality: "Caution",
    color: "amber",
    active: false,
    tips: ["Moderate AQI", "Fading UV", "Pollen settling"],
    recommendation: "Light indoor activity only — asthma patients take caution",
  },
  {
    time: "18:00 – 21:00",
    label: "Evening",
    emoji: "🌆",
    quality: "Good",
    color: "blue",
    active: true,
    tips: ["Cooler air", "Lower UV", "AQI dropping"],
    recommendation: "Good for moderate outdoor exercise — carry inhaler",
  },
]

export default function Dashboard() {
  const { data: session } = useSession()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedCard, setExpandedCard] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!session?.user?.email) return
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard")
        const json = await res.json()
        const logic = calculateDashboardData(json.env, json.profile)
        setData({ ...json, logic })
        setTimeout(() => setLoading(false), 1200)
      } catch (e) {
        console.error(e)
        setLoading(false)
      }
    }
    fetchData()
  }, [session])

  if (loading || !data) return <LoadingScreen />

  const env = data?.env || {}
  const profile = data?.profile || {}
  const logic = data?.logic || { aiInsights: [], actionPlan: [], score: 0 }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  // Filter insights based on profile conditions
  const visibleInsights = HARDCODED_INSIGHTS.filter(ins => {
    if (!ins.condition) return true
    if (ins.condition === 'asthma' && profile?.asthma) return true
    if (ins.condition === 'dust_allergy' && profile?.dust_allergy) return true
    if (ins.condition === 'pollen_allergy' && profile?.pollen_allergy) return true
    return !ins.condition
  }).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-50/30 rounded-full blur-[160px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm mb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live Health-Env Sync</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Welcome, {profile?.first_name || 'User'}.</h1>
            <p className="flex items-center gap-2 text-slate-500 font-medium mt-1">
              <MapPin size={16} className="text-emerald-500" /> {env?.location || 'Unknown Location'}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            {/* 🔥 Risk Hotspots Tab */}
            <Link href="/map">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl shadow-lg shadow-rose-200 cursor-pointer"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider">Risk Hotspots</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
            <button onClick={() => router.push('/auth/health-profile')} className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition"><Edit2 size={20} /></button>
            <button onClick={handleLogout} className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition border border-rose-100"><LogOut size={20} /></button>
          </div>
        </header>

        {/* ── Score + Bio Card ────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-white/80 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-full -z-0" />
            <div className="relative w-44 h-44 shrink-0 z-10">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="44" fill="none" stroke="url(#grad)" strokeWidth="8"
                  strokeDasharray="276.46"
                  initial={{ strokeDashoffset: 276.46 }}
                  animate={{ strokeDashoffset: 276.46 - ((logic?.score || 0) * 2.76) }}
                  transition={{ duration: 2.2, ease: "easeOut" }}
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
                <span className="text-5xl font-black">{logic?.score || 0}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety</span>
              </div>
            </div>
            <div className="space-y-4 z-10">
              <h2 className="text-2xl font-bold">Bio-Environmental Link</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                Your profile indicates <b>{profile?.asthma ? 'respiratory sensitivity' : 'standard resistance'}</b>. Today's {env?.weather?.condition || 'current'} conditions are cross-referenced with your health data in real-time.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider">Level: {profile?.outdoor_activity_level || 'Normal'}</div>
                {profile?.asthma && <div className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-[10px] font-bold uppercase tracking-wider">🫁 Asthma Profile</div>}
                {profile?.dust_allergy && <div className="px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-xl text-[10px] font-bold uppercase tracking-wider">🌫️ Dust Sensitive</div>}
                {profile?.pollen_allergy && <div className="px-3 py-1.5 bg-green-50 text-green-600 border border-green-100 rounded-xl text-[10px] font-bold uppercase tracking-wider">🌿 Pollen Sensitive</div>}
              </div>
            </div>
          </motion.div>

          {/* AI Chat Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-6 text-white flex flex-col justify-between shadow-xl shadow-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
            <div>
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Brain size={20} />
              </div>
              <h3 className="font-bold text-white text-lg">Personalized AI Insights</h3>
              <p className="text-blue-100 text-xs mt-2 leading-relaxed">Get a detailed breakdown of how today's environment affects your specific health conditions.</p>
            </div>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-3 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm"
              >
                Chat with Health AI <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>

        

        {/* ── Core Env Metrics (with explainers) ─────────────────────────── */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Activity className="text-sky-500" /> Environmental Metrics</h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            <EnvInsightCard
              icon={<Wind />} title="Air Quality Index" value={env?.air?.aqi || 48}
              shortDesc={getAQIInsight(env?.air?.aqi || 48)} color="sky"
              meta={ENV_META.aqi}
            />
            <EnvInsightCard
              icon={<Sun />} title="UV Index" value={env?.uv?.index || 6}
              shortDesc={getUVInsight(env?.uv?.index || 6)} color="yellow"
              meta={ENV_META.uv}
            />
            <EnvInsightCard
              icon={<Thermometer />} title="Temperature" value={`${env?.weather?.temp || 32}°C`}
              shortDesc="Thermal cardiovascular stress" color="orange"
              meta={ENV_META.temp}
            />
            <EnvInsightCard
              icon={<Droplets />} title="Humidity" value={`${env?.weather?.humidity || 68}%`}
              shortDesc="Sweat evaporation impact" color="indigo"
              meta={ENV_META.humidity}
            />
          </div>
        </div>

        {/* ── Extra Env Components ────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXTRA_ENV.map((e, i) => (
            <ExtraEnvCard key={i} item={e} />
          ))}
        </div>

        {/* ── Chemical Hazard Analysis ────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Microscope className="text-indigo-500" /> Chemical Hazard Analysis</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">Live Lab Scan</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HARDCODED_CHEMICALS.map((chem, i) => (
              <ChemCard key={i} chem={chem} />
            ))}
          </div>
        </motion.div>
            {/* ── Activity Windows ────────────────────────────────────────────── */}
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Clock size={18} className="text-slate-500" />
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Activity Windows — Today's Schedule</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACTIVITY_WINDOWS.map((w, i) => (
              <ActivityWindowCard key={i} window={w} />
            ))}
          </div>
        </div>
        {/* ── Personalized Medical Analysis + Action Plan ─────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><ShieldCheck className="text-emerald-500" /> Personalized Medical Analysis</h3>
              <p className="text-slate-400 text-xs mb-6 font-medium">Tailored to your health profile — conditions flagged with reasons</p>
              <div className="grid md:grid-cols-2 gap-4">
                {visibleInsights.map((ins, i) => (
                  <MedicalInsightCard key={i} ins={ins} />
                ))}
              </div>
            </div>
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="flex items-center gap-2 font-bold mb-2 uppercase text-xs tracking-widest text-blue-200"><BookOpen size={16} /> Knowledge Base</h4>
                <p className="text-lg font-medium leading-relaxed italic">"{logic?.fact || 'Air pollution causes 7 million premature deaths annually according to WHO — more than malaria, HIV, and tuberculosis combined.'}"</p>
              </div>
              <BookOpen size={120} className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          

          {/* Action Plan */}
          <div className="bg-slate-900 rounded-[2.5rem] p-7 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-emerald-400"><Navigation size={20} /> Action Plan</h3>
              <p className="text-slate-500 text-xs mb-5 font-medium">Tailored for your profile & today's conditions</p>
              <div className="space-y-3">
                {HARDCODED_ACTIONS.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/5 transition-colors cursor-default"
                  >
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-semibold text-slate-200 leading-snug">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Health Goal</p>
              <p className="text-xs text-emerald-100">Complete 30 mins of low-impact indoor movement today — avoid outdoor peak window.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Subcomponents ─────────────────────────────────────────────────────────────

function ActivityWindowCard({ window: w }) {
  const colorMap = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-100", badge: "bg-emerald-500", text: "text-emerald-700", tag: "bg-emerald-100 text-emerald-700" },
    rose: { bg: "bg-rose-50", border: "border-rose-100", badge: "bg-rose-500", text: "text-rose-700", tag: "bg-rose-100 text-rose-700" },
    amber: { bg: "bg-amber-50", border: "border-amber-100", badge: "bg-amber-500", text: "text-amber-700", tag: "bg-amber-100 text-amber-700" },
    blue: { bg: "bg-blue-50", border: "border-blue-100", badge: "bg-blue-500", text: "text-blue-700", tag: "bg-blue-100 text-blue-700" },
  }
  const c = colorMap[w.color]
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={`${w.active ? c.bg : 'bg-slate-50'} ${w.active ? c.border : 'border-slate-100'} border rounded-2xl p-4 flex flex-col gap-3 transition-all`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl">{w.emoji}</span>
        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${w.active ? c.badge : 'bg-slate-200'} ${w.active ? 'text-white' : 'text-slate-500'}`}>
          {w.quality}
        </span>
      </div>
      <div>
        <p className="font-black text-slate-800 text-sm">{w.label}</p>
        <p className={`text-[11px] font-bold ${w.active ? c.text : 'text-slate-400'}`}>{w.time}</p>
      </div>
      <div className="flex flex-wrap gap-1">
        {w.tips.map((t, i) => (
          <span key={i} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${w.active ? c.tag : 'bg-slate-100 text-slate-400'}`}>{t}</span>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 leading-snug italic">{w.recommendation}</p>
    </motion.div>
  )
}

function EnvInsightCard({ icon, title, value, shortDesc, color, meta }) {
  const [open, setOpen] = useState(false)
  const colors = {
    sky: "bg-sky-50 text-sky-500 border-sky-100",
    yellow: "bg-yellow-50 text-yellow-500 border-yellow-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    indigo: "bg-indigo-50 text-indigo-500 border-indigo-100"
  }
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-4 shrink-0`}>
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black mb-1">{value}</p>
      <p className="text-[11px] text-slate-500 leading-relaxed font-medium mb-2">{shortDesc}</p>

      {/* Explainer box */}
      <div className="mt-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><Info size={9} /> What this means</p>
        <p className="text-[10px] text-slate-600 leading-relaxed">{meta.explainer}</p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
          >
            <p className="text-[10px] text-slate-500 leading-relaxed p-2 border-t border-slate-100 mt-1">{meta.detail}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-[9px] text-slate-300 mt-2 text-center">{open ? "▲ less" : "▼ more detail"}</p>
    </motion.div>
  )
}

function ExtraEnvCard({ item }) {
  const colorMap = {
    violet: "bg-violet-50 text-violet-500 border-violet-100",
    teal: "bg-teal-50 text-teal-500 border-teal-100",
    slate: "bg-slate-100 text-slate-500 border-slate-200",
    rose: "bg-rose-50 text-rose-500 border-rose-100",
  }
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
      <div className={`w-10 h-10 ${colorMap[item.color]} rounded-xl flex items-center justify-center`}>
        {item.icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.title}</p>
        <p className="text-xl font-black text-slate-900">{item.value}</p>
        <p className="text-[10px] text-slate-500 font-medium">{item.shortDesc}</p>
      </div>
      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-[10px] text-slate-500 leading-snug">{item.explainer}</p>
      </div>
    </motion.div>
  )
}

function ChemCard({ chem }) {
  const ls = LEVEL_STYLES[chem.level]
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-slate-50 p-3 rounded-2xl text-indigo-600">{chem.icon}</div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase">{chem.name}</p>
          <p className="text-xl font-black text-slate-900">{chem.value} <span className="text-xs font-medium text-slate-400">{chem.unit}</span></p>
        </div>
      </div>

      {/* Level bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-black text-slate-400 uppercase">Concentration Level</span>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${ls.badge}`}>{chem.level.toUpperCase()}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: undefined }}
            className={`h-full ${ls.bar} ${ls.width} rounded-full transition-all duration-1000`}
          />
        </div>
      </div>

      <h4 className="font-bold text-slate-800 text-sm mb-1">{chem.alias}</h4>

      <div className="mt-auto space-y-2">
        <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-xl">
          <p className="text-[9px] font-black text-amber-600 uppercase flex items-center gap-1"><Info size={9} /> Likely Source</p>
          <p className="text-[10px] text-amber-800 font-medium leading-snug">{chem.source}</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl">
          <p className="text-[9px] font-black text-rose-600 uppercase flex items-center gap-1"><ShieldAlert size={9} /> Biological Impact</p>
          <p className="text-[10px] text-rose-900 font-bold leading-tight">{chem.impact}</p>
        </div>
      </div>
    </motion.div>
  )
}

function MedicalInsightCard({ ins }) {
  const typeStyles = {
    critical: "bg-rose-50 border-rose-100",
    warning: "bg-amber-50 border-amber-100",
    info: "bg-slate-50 border-slate-100",
  }
  const labelStyles = {
    critical: "text-rose-600 bg-rose-100",
    warning: "text-amber-600 bg-amber-100",
    info: "text-slate-500 bg-slate-100",
  }
  return (
    <div className={`p-5 rounded-3xl border ${typeStyles[ins.type]} flex flex-col gap-2`}>
      <div className="flex items-center justify-between">
        <span className="text-xl">{ins.icon}</span>
        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${labelStyles[ins.type]}`}>{ins.type}</span>
      </div>
      <p className="text-[10px] font-black uppercase text-slate-500 tracking-wide">{ins.title}</p>
      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{ins.text}</p>
    </div>
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