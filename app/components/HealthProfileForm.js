

// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { AlertCircle, Heart, Wind, Activity, MapPin, User, Thermometer, Leaf, Shield, ChevronRight, ChevronLeft, Check, Droplets, Sun } from 'lucide-react'
// import { healthStore } from '@/lib/healthstore'

// const STEPS = [
//   { num: 1, title: 'Basic Info', subtitle: 'Who you are', icon: User, color: 'emerald' },
//   { num: 2, title: 'Respiratory', subtitle: 'Breathing & allergies', icon: Wind, color: 'sky' },
//   { num: 3, title: 'Health', subtitle: 'Conditions & lifestyle', icon: Activity, color: 'violet' },
//   { num: 4, title: 'Confirm', subtitle: 'Review & submit', icon: Shield, color: 'teal' },
// ]

// const COLOR_MAP = {
//   emerald: { ring: 'ring-emerald-500', bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', focus: 'focus:border-emerald-400 focus:ring-emerald-100' },
//   sky: { ring: 'ring-sky-500', bg: 'bg-sky-500', light: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', focus: 'focus:border-sky-400 focus:ring-sky-100' },
//   violet: { ring: 'ring-violet-500', bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', focus: 'focus:border-violet-400 focus:ring-violet-100' },
//   teal: { ring: 'ring-teal-500', bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', focus: 'focus:border-teal-400 focus:ring-teal-100' },
// }

// export default function HealthProfileForm() {
//   const router = useRouter()
//   const [step, setStep] = useState(1)
//   const [direction, setDirection] = useState(1)
//   const [profile, setProfile] = useState({
//     firstName: '', age: '', gender: '', location: '',
//     asthma: false, allergyType: '', otherRespiratoryConditions: '',
//     heartDisease: false, hypertension: false, otherCardiacConditions: '',
//     diabetes: false, obesity: false, smoker: false,
//     regularFever: false, skinSensitivity: false, specificAllergens: '',
//     outdoorActivityLevel: 'moderate', workEnvironment: 'indoor',
//     exercise: false, exerciseFrequency: '',
//     medications: '', otherConditions: '', healthConcerns: '',
//     notificationFrequency: 'daily', dataUsageConsent: false,
//   })
//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     const existing = healthStore.getProfile()
//     if (existing) setProfile(prev => ({ ...prev, ...existing }))
//   }, [])

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setProfile(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
//   }

//   const validateStep = () => {
//     const newErrors = {}
//     if (step === 1) {
//       if (!profile.firstName.trim()) newErrors.firstName = 'First name is required'
//       if (!profile.age || profile.age < 1 || profile.age > 120) newErrors.age = 'Valid age required'
//       if (!profile.gender) newErrors.gender = 'Please select a gender'
//       if (!profile.location.trim()) newErrors.location = 'Location is required'
//     }
//     if (step === 4) {
//       if (!profile.dataUsageConsent) newErrors.dataUsageConsent = 'You must accept to continue'
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleNext = () => {
//     if (validateStep()) { setDirection(1); setStep(s => s + 1) }
//   }
//   const handleBack = () => { setDirection(-1); setStep(s => s - 1) }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateStep()) return
//     healthStore.setProfile(profile)
//     const res = await fetch("/api/health_profile", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(profile),
//     })
//     if (res.ok) router.push('/dashboard')
//     else alert("Failed to save profile")
//   }

//   const currentStep = STEPS[step - 1]
//   const c = COLOR_MAP[currentStep.color]
//   const progress = ((step - 1) / (STEPS.length - 1)) * 100

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-[#f0f4f0]">
//       {/* Nature-themed ambient bg */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px]" />
//         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-[140px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-teal-100/20 rounded-full blur-[100px]" />
//         {/* Decorative leaf shapes */}
//         <div className="absolute top-10 right-10 w-24 h-24 bg-emerald-300/20 rounded-tl-full rounded-br-full rotate-45" />
//         <div className="absolute bottom-20 left-10 w-32 h-32 bg-sky-300/20 rounded-tl-full rounded-br-full -rotate-12" />
//       </div>

//       <div className="max-w-2xl mx-auto py-12 px-4">

//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full shadow-sm mb-4">
//             <Leaf size={12} className="text-emerald-500" />
//             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Health × Environment Profile</span>
//           </div>
//           <h1 className="text-3xl font-black text-slate-800 tracking-tight">Build Your Health Profile</h1>
//           <p className="text-slate-500 text-sm mt-2">Personalized environmental risk analysis starts here</p>
//         </div>

//         {/* Step Indicators */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between relative">
//             {/* Progress track */}
//             <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200 -z-0">
//               <motion.div
//                 className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-teal-400 rounded-full"
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5, ease: 'easeInOut' }}
//               />
//             </div>
//             {STEPS.map((s) => {
//               const Icon = s.icon
//               const sc = COLOR_MAP[s.color]
//               const isComplete = step > s.num
//               const isActive = step === s.num
//               return (
//                 <div key={s.num} className="flex flex-col items-center gap-2 z-10">
//                   <motion.div
//                     animate={{ scale: isActive ? 1.12 : 1 }}
//                     className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-sm
//                       ${isComplete ? `${sc.bg} border-transparent text-white shadow-md` :
//                         isActive ? `bg-white ${sc.ring} ring-2 ring-offset-1 ${sc.text} border-transparent` :
//                         'bg-white border-slate-200 text-slate-400'}`}
//                   >
//                     {isComplete ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
//                   </motion.div>
//                   <div className="text-center hidden md:block">
//                     <p className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{s.title}</p>
//                     <p className={`text-[9px] ${isActive ? 'text-slate-500' : 'text-slate-300'}`}>{s.subtitle}</p>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         {/* Card */}
//         <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden">

//           {/* Card top accent bar */}
//           <div className={`h-1 w-full bg-gradient-to-r ${
//             step === 1 ? 'from-emerald-400 to-teal-400' :
//             step === 2 ? 'from-sky-400 to-blue-400' :
//             step === 3 ? 'from-violet-400 to-purple-400' :
//             'from-teal-400 to-emerald-400'
//           }`} />

//           <div className="p-8">
//             {/* Step heading */}
//             <div className="flex items-center gap-3 mb-8">
//               <div className={`w-10 h-10 ${c.light} ${c.text} rounded-2xl flex items-center justify-center`}>
//                 {(() => { const Icon = currentStep.icon; return <Icon size={18} /> })()}
//               </div>
//               <div>
//                 <p className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>Step {step} of 4</p>
//                 <h2 className="text-xl font-black text-slate-800">{currentStep.title}</h2>
//               </div>
//             </div>

//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={step}
//                 custom={direction}
//                 initial={{ opacity: 0, x: direction * 40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: direction * -40 }}
//                 transition={{ duration: 0.3, ease: 'easeInOut' }}
//               >

//                 {/* ── Step 1 ── */}
//                 {step === 1 && (
//                   <div className="space-y-5">
//                     <div className="grid md:grid-cols-2 gap-5">
//                       <FormField label="First Name" required error={errors.firstName}>
//                         <input
//                           type="text" name="firstName" value={profile.firstName}
//                           onChange={handleChange} placeholder="e.g. Arjun"
//                           className={inputClass(errors.firstName, c.focus)}
//                         />
//                       </FormField>
//                       <FormField label="Age" required error={errors.age}>
//                         <input
//                           type="number" name="age" value={profile.age}
//                           onChange={handleChange} placeholder="25" min="1" max="120"
//                           className={inputClass(errors.age, c.focus)}
//                         />
//                       </FormField>
//                     </div>
//                     <FormField label="Gender" required error={errors.gender}>
//                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                         {['male', 'female', 'other', 'prefer-not-to-say'].map(g => (
//                           <label key={g} className={`cursor-pointer px-3 py-2.5 rounded-xl border-2 text-center text-xs font-bold capitalize transition-all
//                             ${profile.gender === g ? `${c.light} ${c.border} ${c.text}` : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-slate-50'}`}>
//                             <input type="radio" name="gender" value={g} checked={profile.gender === g} onChange={handleChange} className="sr-only" />
//                             {g === 'prefer-not-to-say' ? 'Prefer not' : g.charAt(0).toUpperCase() + g.slice(1)}
//                           </label>
//                         ))}
//                       </div>
//                       {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
//                     </FormField>
//                     <FormField label="Location (City / Region)" required error={errors.location}>
//                       <div className="relative">
//                         <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                         <input
//                           type="text" name="location" value={profile.location}
//                           onChange={handleChange} placeholder="e.g. Mumbai, India"
//                           className={`${inputClass(errors.location, c.focus)} pl-10`}
//                         />
//                       </div>
//                     </FormField>
//                   </div>
//                 )}

//                 {/* ── Step 2 ── */}
//                 {step === 2 && (
//                   <div className="space-y-6">
//                     <div className="grid md:grid-cols-3 gap-3">
//                       {[
//                         { name: 'asthma', label: 'Asthma', icon: '🫁', desc: 'Chronic respiratory condition' },
//                         { name: 'regularFever', label: 'Regular Fever', icon: '🌡️', desc: 'Recurring fever episodes' },
//                         { name: 'skinSensitivity', label: 'Skin Sensitivity', icon: '🧴', desc: 'Dermatitis / eczema' },
//                       ].map(item => (
//                         <ToggleCard key={item.name} item={item} profile={profile} handleChange={handleChange} c={c} />
//                       ))}
//                     </div>

//                     <FormField label="Specific Allergens">
//                       <input
//                         type="text" name="specificAllergens" value={profile.specificAllergens}
//                         onChange={handleChange} placeholder="e.g. pollen, dust mites, pet dander"
//                         className={inputClass(false, c.focus)}
//                       />
//                     </FormField>

//                     <FormField label="Other Respiratory Conditions">
//                       <textarea
//                         name="otherRespiratoryConditions" value={profile.otherRespiratoryConditions}
//                         onChange={handleChange} placeholder="e.g. COPD, chronic bronchitis, sleep apnea "
//                         rows="3" className={inputClass(false, c.focus)}
//                       />
//                     </FormField>

//                     <div className={`${c.light} rounded-2xl p-4 border ${c.border}`}>
//                       <p className={`text-[10px] font-black uppercase tracking-widest ${c.text} mb-1 flex items-center gap-1.5`}>
//                         <Wind size={10} /> Why this matters
//                       </p>
//                       <p className="text-xs text-slate-600 leading-relaxed">Respiratory conditions dramatically increase sensitivity to PM2.5, ozone, and pollen. Your selections help us flag high-risk days before they affect you.</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* ── Step 3 ── */}
//                 {step === 3 && (
//                   <div className="space-y-5">
//                     <SectionBlock label="Cardiovascular Health" icon="❤️" color="rose">
//                       <div className="grid md:grid-cols-2 gap-3">
//                         {[
//                           { name: 'heartDisease', label: 'Heart Disease', desc: 'Coronary artery disease, etc.' },
//                           { name: 'hypertension', label: 'Hypertension', desc: 'High blood pressure' },
//                         ].map(item => (
//                           <CheckRow key={item.name} item={item} profile={profile} handleChange={handleChange} />
//                         ))}
//                       </div>
//                     </SectionBlock>

//                     <SectionBlock label="Metabolic Health" icon="⚡" color="amber">
//                       <div className="grid md:grid-cols-2 gap-3">
//                         {[
//                           { name: 'diabetes', label: 'Diabetes', desc: 'Type 1 or Type 2' },
//                           { name: 'obesity', label: 'Overweight / Obesity', desc: 'BMI considerations' },
//                         ].map(item => (
//                           <CheckRow key={item.name} item={item} profile={profile} handleChange={handleChange} />
//                         ))}
//                       </div>
//                     </SectionBlock>

//                     <SectionBlock label="Lifestyle Factors" icon="🌿" color="emerald">
//                       <CheckRow
//                         item={{ name: 'smoker', label: 'Smoker or exposed to secondhand smoke', desc: 'Significantly increases pollution sensitivity' }}
//                         profile={profile} handleChange={handleChange}
//                       />
//                       <div className="mt-4">
//                         <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Outdoor Activity Level</label>
//                         <div className="grid grid-cols-3 gap-2">
//                           {[
//                             { val: 'low', label: 'Low', emoji: '🏠', sub: 'Mostly indoors' },
//                             { val: 'moderate', label: 'Moderate', emoji: '🚶', sub: 'Occasional outdoor' },
//                             { val: 'high', label: 'High', emoji: '🏃', sub: 'Frequent outdoor' },
//                           ].map(opt => (
//                             <label key={opt.val} className={`cursor-pointer p-3 rounded-xl border-2 text-center transition-all
//                               ${profile.outdoorActivityLevel === opt.val ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
//                               <input type="radio" name="outdoorActivityLevel" value={opt.val} checked={profile.outdoorActivityLevel === opt.val} onChange={handleChange} className="sr-only" />
//                               <span className="text-lg block">{opt.emoji}</span>
//                               <span className="text-[10px] font-black uppercase text-slate-700 block">{opt.label}</span>
//                               <span className="text-[9px] text-slate-400">{opt.sub}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     </SectionBlock>

//                     <FormField label="Current Medications (optional)">
//                       <textarea
//                         name="medications" value={profile.medications}
//                         onChange={handleChange} placeholder="List any medications you currently take"
//                         rows="2" className={inputClass(false, 'focus:border-violet-400 focus:ring-violet-100')}
//                       />
//                     </FormField>
//                   </div>
//                 )}

//                 {/* ── Step 4 ── */}
//                 {step === 4 && (
//                   <div className="space-y-5">
//                     {/* Summary */}
//                     <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5">
//                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-1.5">
//                         <Check size={10} /> Profile Summary
//                       </p>
//                       <div className="grid md:grid-cols-2 gap-3">
//                         {[
//                           { label: 'Name', value: profile.firstName || '—' },
//                           { label: 'Age', value: profile.age || '—' },
//                           { label: 'Gender', value: profile.gender || '—' },
//                           { label: 'Location', value: profile.location || '—' },
//                           { label: 'Activity Level', value: profile.outdoorActivityLevel },
//                           { label: 'Asthma', value: profile.asthma ? 'Yes' : 'No' },
//                           { label: 'Regular Fever', value: profile.regularFever ? 'Yes' : 'No' },
//                           { label: 'Allergens', value: profile.specificAllergens || 'None specified' },
//                         ].map(item => (
//                           <div key={item.label} className="flex items-center gap-2">
//                             <span className="text-[10px] font-black text-slate-400 uppercase w-24 shrink-0">{item.label}</span>
//                             <span className="text-xs font-bold text-slate-700 truncate">{item.value}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* What's next */}
//                     <div className="bg-slate-900 rounded-2xl p-5 text-white">
//                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">What happens next</p>
//                       <div className="space-y-2.5">
//                         {[
//                           { icon: '🛡️', text: 'Your health profile is securely stored and encrypted' },
//                           { icon: '🌿', text: 'Get personalized environmental risk recommendations' },
//                           { icon: '🔔', text: 'Receive alerts tailored to your specific conditions' },
//                           { icon: '📊', text: 'Access real-time AQI, pollen, and UV data with health context' },
//                         ].map((item, i) => (
//                           <div key={i} className="flex items-start gap-3 text-xs text-slate-300">
//                             <span className="text-base leading-none mt-0.5">{item.icon}</span>
//                             <span className="leading-snug">{item.text}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Consent */}
//                     <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-2xl border-2 transition-all
//                       ${profile.dataUsageConsent ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
//                       <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all
//                         ${profile.dataUsageConsent ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>
//                         {profile.dataUsageConsent && <Check size={12} className="text-white" strokeWidth={3} />}
//                       </div>
//                       <input type="checkbox" name="dataUsageConsent" checked={profile.dataUsageConsent} onChange={handleChange} className="sr-only" />
//                       <span className="text-xs text-slate-600 leading-relaxed">
//                         I understand my health profile will be used to provide personalized environmental recommendations. I agree to the privacy policy and terms of service.
//                       </span>
//                     </label>
//                     {errors.dataUsageConsent && (
//                       <p className="text-red-500 text-xs -mt-2">{errors.dataUsageConsent}</p>
//                     )}
//                   </div>
//                 )}

//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation */}
//             <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
//               {step > 1 && (
//                 <motion.button
//                   whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
//                   onClick={handleBack}
//                   className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-600 font-bold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
//                 >
//                   <ChevronLeft size={16} /> Back
//                 </motion.button>
//               )}
//               <motion.button
//                 whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
//                 onClick={step < 4 ? handleNext : handleSubmit}
//                 className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-all
//                   ${step === 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200' :
//                     step === 2 ? 'bg-gradient-to-r from-sky-500 to-blue-500 shadow-sky-200' :
//                     step === 3 ? 'bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200' :
//                     'bg-gradient-to-r from-teal-500 to-emerald-500 shadow-teal-200'}`}
//               >
//                 {step < 4 ? (
//                   <> Continue <ChevronRight size={16} /> </>
//                 ) : (
//                   <> <Leaf size={16} /> Create My Profile </>
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom label */}
//         <p className="text-center text-[11px] text-slate-400 mt-6 flex items-center justify-center gap-1.5">
//           <Shield size={11} /> Your data is encrypted and never sold to third parties
//         </p>
//       </div>
//     </div>
//   )
// }

// // ─── Helper Components ─────────────────────────────────────────────────────────

// function inputClass(hasError, focusClass) {
//   return `w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-slate-700 bg-white outline-none transition-all focus:ring-2 focus:ring-offset-0 placeholder:text-slate-300
//     ${hasError ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : `border-slate-200 ${focusClass}`}`
// }

// function FormField({ label, required, error, children }) {
//   return (
//     <div>
//       <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>
//       {children}
//       {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
//     </div>
//   )
// }

// function ToggleCard({ item, profile, handleChange, c }) {
//   const checked = profile[item.name]
//   return (
//     <label className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col gap-2 transition-all
//       ${checked ? `${c.light} ${c.border}` : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
//       <input type="checkbox" name={item.name} checked={checked} onChange={handleChange} className="sr-only" />
//       <div className="flex items-center justify-between">
//         <span className="text-2xl">{item.icon}</span>
//         <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all
//           ${checked ? `${c.bg} border-transparent` : 'border-slate-300 bg-white'}`}>
//           {checked && <Check size={12} className="text-white" strokeWidth={3} />}
//         </div>
//       </div>
//       <div>
//         <p className="text-xs font-black text-slate-700">{item.label}</p>
//         <p className="text-[10px] text-slate-400">{item.desc}</p>
//       </div>
//     </label>
//   )
// }

// function CheckRow({ item, profile, handleChange }) {
//   const checked = profile[item.name]
//   return (
//     <label className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border-2 transition-all
//       ${checked ? 'border-slate-300 bg-slate-50' : 'border-transparent hover:border-slate-100 bg-transparent'}`}>
//       <input type="checkbox" name={item.name} checked={checked} onChange={handleChange} className="sr-only" />
//       <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all
//         ${checked ? 'bg-slate-700 border-slate-700' : 'border-slate-300 bg-white'}`}>
//         {checked && <Check size={11} className="text-white" strokeWidth={3} />}
//       </div>
//       <div>
//         <p className="text-xs font-bold text-slate-700">{item.label}</p>
//         {item.desc && <p className="text-[10px] text-slate-400">{item.desc}</p>}
//       </div>
//     </label>
//   )
// }

// function SectionBlock({ label, icon, color, children }) {
//   const colorMap = {
//     rose: 'bg-rose-50 border-rose-100 text-rose-600',
//     amber: 'bg-amber-50 border-amber-100 text-amber-600',
//     emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
//   }
//   return (
//     <div className={`rounded-2xl border p-4 ${colorMap[color]}`}>
//       <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-1.5">
//         <span>{icon}</span> {label}
//       </p>
//       <div className="space-y-1 text-slate-700">
//         {children}
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Heart, Wind, Activity, MapPin, User, Thermometer, Leaf, Shield, ChevronRight, ChevronLeft, Check, Droplets, Sun } from 'lucide-react'
import { healthStore } from '@/lib/healthstore'

const STEPS = [
  { num: 1, title: 'Basic Info', subtitle: 'Who you are', icon: User, color: 'emerald' },
  { num: 2, title: 'Respiratory', subtitle: 'Breathing & allergies', icon: Wind, color: 'sky' },
  { num: 3, title: 'Health', subtitle: 'Conditions & lifestyle', icon: Activity, color: 'violet' },
  { num: 4, title: 'Confirm', subtitle: 'Review & submit', icon: Shield, color: 'teal' },
]

const COLOR_MAP = {
  emerald: { ring: 'ring-emerald-500', bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', focus: 'focus:border-emerald-400 focus:ring-emerald-100' },
  sky: { ring: 'ring-sky-500', bg: 'bg-sky-500', light: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', focus: 'focus:border-sky-400 focus:ring-sky-100' },
  violet: { ring: 'ring-violet-500', bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', focus: 'focus:border-violet-400 focus:ring-violet-100' },
  teal: { ring: 'ring-teal-500', bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', focus: 'focus:border-teal-400 focus:ring-teal-100' },
}

// 0 = low, 1 = moderate, 2 = high
const LEVEL_OPTIONS = [
  { val: 0, label: 'Low', emoji: '🟢', sub: 'Mild / well-controlled' },
  { val: 1, label: 'Moderate', emoji: '🟡', sub: 'Occasional symptoms' },
  { val: 2, label: 'High', emoji: '🔴', sub: 'Frequent / severe' },
]

export default function HealthProfileForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [profile, setProfile] = useState({
    firstName: '', age: '', gender: '', location: '',
    asthma: false, allergyType: '', otherRespiratoryConditions: '',
    respiratoryLevel: 0,   // ← new
    heartDisease: false, hypertension: false, otherCardiacConditions: '',
    diabetes: false, obesity: false, smoker: false,
    healthLevel: 0,        // ← new
    regularFever: false, skinSensitivity: false, specificAllergens: '',
    outdoorActivityLevel: 'moderate', workEnvironment: 'indoor',
    exercise: false, exerciseFrequency: '',
    medications: '', otherConditions: '', healthConcerns: '',
    notificationFrequency: 'daily', dataUsageConsent: false,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const existing = healthStore.getProfile()
    if (existing) setProfile(prev => ({ ...prev, ...existing }))
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfile(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  // For numeric radio fields (respiratoryLevel, healthLevel)
  const handleLevelChange = (name, val) => {
    setProfile(prev => ({ ...prev, [name]: val }))
  }

  const validateStep = () => {
    const newErrors = {}
    if (step === 1) {
      if (!profile.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!profile.age || profile.age < 1 || profile.age > 120) newErrors.age = 'Valid age required'
      if (!profile.gender) newErrors.gender = 'Please select a gender'
      if (!profile.location.trim()) newErrors.location = 'Location is required'
    }
    if (step === 4) {
      if (!profile.dataUsageConsent) newErrors.dataUsageConsent = 'You must accept to continue'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) { setDirection(1); setStep(s => s + 1) }
  }
  const handleBack = () => { setDirection(-1); setStep(s => s - 1) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep()) return
    healthStore.setProfile(profile)
    const res = await fetch("/api/health_profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
    if (res.ok) router.push('/dashboard')
    else alert("Failed to save profile")
  }

  const currentStep = STEPS[step - 1]
  const c = COLOR_MAP[currentStep.color]
  const progress = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f0f4f0]">
      {/* Nature-themed ambient bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-teal-100/20 rounded-full blur-[100px]" />
        <div className="absolute top-10 right-10 w-24 h-24 bg-emerald-300/20 rounded-tl-full rounded-br-full rotate-45" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-sky-300/20 rounded-tl-full rounded-br-full -rotate-12" />
      </div>

      <div className="max-w-2xl mx-auto py-12 px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-full shadow-sm mb-4">
            <Leaf size={12} className="text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Health × Environment Profile</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Build Your Health Profile</h1>
          <p className="text-slate-500 text-sm mt-2">Personalized environmental risk analysis starts here</p>
        </div>

        {/* Step Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-200 -z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            {STEPS.map((s) => {
              const Icon = s.icon
              const sc = COLOR_MAP[s.color]
              const isComplete = step > s.num
              const isActive = step === s.num
              return (
                <div key={s.num} className="flex flex-col items-center gap-2 z-10">
                  <motion.div
                    animate={{ scale: isActive ? 1.12 : 1 }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-sm
                      ${isComplete ? `${sc.bg} border-transparent text-white shadow-md` :
                        isActive ? `bg-white ${sc.ring} ring-2 ring-offset-1 ${sc.text} border-transparent` :
                        'bg-white border-slate-200 text-slate-400'}`}
                  >
                    {isComplete ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
                  </motion.div>
                  <div className="text-center hidden md:block">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>{s.title}</p>
                    <p className={`text-[9px] ${isActive ? 'text-slate-500' : 'text-slate-300'}`}>{s.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className={`h-1 w-full bg-gradient-to-r ${
            step === 1 ? 'from-emerald-400 to-teal-400' :
            step === 2 ? 'from-sky-400 to-blue-400' :
            step === 3 ? 'from-violet-400 to-purple-400' :
            'from-teal-400 to-emerald-400'
          }`} />

          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 ${c.light} ${c.text} rounded-2xl flex items-center justify-center`}>
                {(() => { const Icon = currentStep.icon; return <Icon size={18} /> })()}
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>Step {step} of 4</p>
                <h2 className="text-xl font-black text-slate-800">{currentStep.title}</h2>
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >

                {/* ── Step 1 ── */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <FormField label="First Name" required error={errors.firstName}>
                        <input
                          type="text" name="firstName" value={profile.firstName}
                          onChange={handleChange} placeholder="e.g. Arjun"
                          className={inputClass(errors.firstName, c.focus)}
                        />
                      </FormField>
                      <FormField label="Age" required error={errors.age}>
                        <input
                          type="number" name="age" value={profile.age}
                          onChange={handleChange} placeholder="25" min="1" max="120"
                          className={inputClass(errors.age, c.focus)}
                        />
                      </FormField>
                    </div>
                    <FormField label="Gender" required error={errors.gender}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['male', 'female', 'other', 'prefer-not-to-say'].map(g => (
                          <label key={g} className={`cursor-pointer px-3 py-2.5 rounded-xl border-2 text-center text-xs font-bold capitalize transition-all
                            ${profile.gender === g ? `${c.light} ${c.border} ${c.text}` : 'border-slate-100 text-slate-500 hover:border-slate-200 bg-slate-50'}`}>
                            <input type="radio" name="gender" value={g} checked={profile.gender === g} onChange={handleChange} className="sr-only" />
                            {g === 'prefer-not-to-say' ? 'Prefer not' : g.charAt(0).toUpperCase() + g.slice(1)}
                          </label>
                        ))}
                      </div>
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </FormField>
                    <FormField label="Location (City / Region)" required error={errors.location}>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text" name="location" value={profile.location}
                          onChange={handleChange} placeholder="e.g. Mumbai, India"
                          className={`${inputClass(errors.location, c.focus)} pl-10`}
                        />
                      </div>
                    </FormField>
                  </div>
                )}

                {/* ── Step 2 ── */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        { name: 'asthma', label: 'Asthma', icon: '🫁', desc: 'Chronic respiratory condition' },
                        { name: 'regularFever', label: 'Regular Fever', icon: '🌡️', desc: 'Recurring fever episodes' },
                        { name: 'skinSensitivity', label: 'Skin Sensitivity', icon: '🧴', desc: 'Dermatitis / eczema' },
                      ].map(item => (
                        <ToggleCard key={item.name} item={item} profile={profile} handleChange={handleChange} c={c} />
                      ))}
                    </div>

                    <FormField label="Specific Allergens">
                      <input
                        type="text" name="specificAllergens" value={profile.specificAllergens}
                        onChange={handleChange} placeholder="e.g. pollen, dust mites, pet dander"
                        className={inputClass(false, c.focus)}
                      />
                    </FormField>

                    <FormField label="Other Respiratory Conditions">
                      <textarea
                        name="otherRespiratoryConditions" value={profile.otherRespiratoryConditions}
                        onChange={handleChange} placeholder="e.g. COPD, chronic bronchitis, sleep apnea"
                        rows="3" className={inputClass(false, c.focus)}
                      />
                    </FormField>

                    {/* ── Respiratory Level ── NEW */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                        Overall Respiratory Severity
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {LEVEL_OPTIONS.map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => handleLevelChange('respiratoryLevel', opt.val)}
                            className={`p-3 rounded-xl border-2 text-center transition-all
                              ${profile.respiratoryLevel === opt.val
                                ? 'border-sky-400 bg-sky-50'
                                : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                          >
                            <span className="text-lg block mb-1">{opt.emoji}</span>
                            <span className="text-[10px] font-black uppercase text-slate-700 block">{opt.label}</span>
                            <span className="text-[9px] text-slate-400">{opt.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={`${c.light} rounded-2xl p-4 border ${c.border}`}>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${c.text} mb-1 flex items-center gap-1.5`}>
                        <Wind size={10} /> Why this matters
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">Respiratory conditions dramatically increase sensitivity to PM2.5, ozone, and pollen. Your selections help us flag high-risk days before they affect you.</p>
                    </div>
                  </div>
                )}

                {/* ── Step 3 ── */}
                {step === 3 && (
                  <div className="space-y-5">
                    <SectionBlock label="Cardiovascular Health" icon="❤️" color="rose">
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { name: 'heartDisease', label: 'Heart Disease', desc: 'Coronary artery disease, etc.' },
                          { name: 'hypertension', label: 'Hypertension', desc: 'High blood pressure' },
                        ].map(item => (
                          <CheckRow key={item.name} item={item} profile={profile} handleChange={handleChange} />
                        ))}
                      </div>
                    </SectionBlock>

                    <SectionBlock label="Metabolic Health" icon="⚡" color="amber">
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { name: 'diabetes', label: 'Diabetes', desc: 'Type 1 or Type 2' },
                          { name: 'obesity', label: 'Overweight / Obesity', desc: 'BMI considerations' },
                        ].map(item => (
                          <CheckRow key={item.name} item={item} profile={profile} handleChange={handleChange} />
                        ))}
                      </div>
                    </SectionBlock>

                    <SectionBlock label="Lifestyle Factors" icon="🌿" color="emerald">
                      <CheckRow
                        item={{ name: 'smoker', label: 'Smoker or exposed to secondhand smoke', desc: 'Significantly increases pollution sensitivity' }}
                        profile={profile} handleChange={handleChange}
                      />
                      <div className="mt-4">
                        <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Outdoor Activity Level</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { val: 'low', label: 'Low', emoji: '🏠', sub: 'Mostly indoors' },
                            { val: 'moderate', label: 'Moderate', emoji: '🚶', sub: 'Occasional outdoor' },
                            { val: 'high', label: 'High', emoji: '🏃', sub: 'Frequent outdoor' },
                          ].map(opt => (
                            <label key={opt.val} className={`cursor-pointer p-3 rounded-xl border-2 text-center transition-all
                              ${profile.outdoorActivityLevel === opt.val ? 'border-emerald-400 bg-emerald-50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                              <input type="radio" name="outdoorActivityLevel" value={opt.val} checked={profile.outdoorActivityLevel === opt.val} onChange={handleChange} className="sr-only" />
                              <span className="text-lg block">{opt.emoji}</span>
                              <span className="text-[10px] font-black uppercase text-slate-700 block">{opt.label}</span>
                              <span className="text-[9px] text-slate-400">{opt.sub}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </SectionBlock>

                    {/* ── Health Level ── NEW */}
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                        Overall Health Condition Severity
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {LEVEL_OPTIONS.map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => handleLevelChange('healthLevel', opt.val)}
                            className={`p-3 rounded-xl border-2 text-center transition-all
                              ${profile.healthLevel === opt.val
                                ? 'border-violet-400 bg-violet-50'
                                : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                          >
                            <span className="text-lg block mb-1">{opt.emoji}</span>
                            <span className="text-[10px] font-black uppercase text-slate-700 block">{opt.label}</span>
                            <span className="text-[9px] text-slate-400">{opt.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <FormField label="Current Medications (optional)">
                      <textarea
                        name="medications" value={profile.medications}
                        onChange={handleChange} placeholder="List any medications you currently take"
                        rows="2" className={inputClass(false, 'focus:border-violet-400 focus:ring-violet-100')}
                      />
                    </FormField>
                  </div>
                )}

                {/* ── Step 4 ── */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-1.5">
                        <Check size={10} /> Profile Summary
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { label: 'Name', value: profile.firstName || '—' },
                          { label: 'Age', value: profile.age || '—' },
                          { label: 'Gender', value: profile.gender || '—' },
                          { label: 'Location', value: profile.location || '—' },
                          { label: 'Activity Level', value: profile.outdoorActivityLevel },
                          { label: 'Asthma', value: profile.asthma ? 'Yes' : 'No' },
                          { label: 'Regular Fever', value: profile.regularFever ? 'Yes' : 'No' },
                          { label: 'Allergens', value: profile.specificAllergens || 'None specified' },
                          { label: 'Respiratory Level', value: ['Low', 'Moderate', 'High'][profile.respiratoryLevel] },
                          { label: 'Health Level', value: ['Low', 'Moderate', 'High'][profile.healthLevel] },
                        ].map(item => (
                          <div key={item.label} className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase w-28 shrink-0">{item.label}</span>
                            <span className="text-xs font-bold text-slate-700 truncate">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-5 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">What happens next</p>
                      <div className="space-y-2.5">
                        {[
                          { icon: '🛡️', text: 'Your health profile is securely stored and encrypted' },
                          { icon: '🌿', text: 'Get personalized environmental risk recommendations' },
                          { icon: '🔔', text: 'Receive alerts tailored to your specific conditions' },
                          { icon: '📊', text: 'Access real-time AQI, pollen, and UV data with health context' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs text-slate-300">
                            <span className="text-base leading-none mt-0.5">{item.icon}</span>
                            <span className="leading-snug">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-2xl border-2 transition-all
                      ${profile.dataUsageConsent ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all
                        ${profile.dataUsageConsent ? 'bg-teal-500 border-teal-500' : 'border-slate-300'}`}>
                        {profile.dataUsageConsent && <Check size={12} className="text-white" strokeWidth={3} />}
                      </div>
                      <input type="checkbox" name="dataUsageConsent" checked={profile.dataUsageConsent} onChange={handleChange} className="sr-only" />
                      <span className="text-xs text-slate-600 leading-relaxed">
                        I understand my health profile will be used to provide personalized environmental recommendations. I agree to the privacy policy and terms of service.
                      </span>
                    </label>
                    {errors.dataUsageConsent && (
                      <p className="text-red-500 text-xs -mt-2">{errors.dataUsageConsent}</p>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
              {step > 1 && (
                <motion.button
                  whileHover={{ x: -2 }} whileTap={{ scale: 0.97 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-600 font-bold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
                >
                  <ChevronLeft size={16} /> Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={step < 4 ? handleNext : handleSubmit}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-all
                  ${step === 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200' :
                    step === 2 ? 'bg-gradient-to-r from-sky-500 to-blue-500 shadow-sky-200' :
                    step === 3 ? 'bg-gradient-to-r from-violet-500 to-purple-500 shadow-violet-200' :
                    'bg-gradient-to-r from-teal-500 to-emerald-500 shadow-teal-200'}`}
              >
                {step < 4 ? (
                  <> Continue <ChevronRight size={16} /> </>
                ) : (
                  <> <Leaf size={16} /> Create My Profile </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6 flex items-center justify-center gap-1.5">
          <Shield size={11} /> Your data is encrypted and never sold to third parties
        </p>
      </div>
    </div>
  )
}

// ─── Helper Components ─────────────────────────────────────────────────────────

function inputClass(hasError, focusClass) {
  return `w-full px-4 py-3 rounded-xl border-2 text-sm font-medium text-slate-700 bg-white outline-none transition-all focus:ring-2 focus:ring-offset-0 placeholder:text-slate-300
    ${hasError ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : `border-slate-200 ${focusClass}`}`
}

function FormField({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>}
    </div>
  )
}

function ToggleCard({ item, profile, handleChange, c }) {
  const checked = profile[item.name]
  return (
    <label className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col gap-2 transition-all
      ${checked ? `${c.light} ${c.border}` : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
      <input type="checkbox" name={item.name} checked={checked} onChange={handleChange} className="sr-only" />
      <div className="flex items-center justify-between">
        <span className="text-2xl">{item.icon}</span>
        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all
          ${checked ? `${c.bg} border-transparent` : 'border-slate-300 bg-white'}`}>
          {checked && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>
      </div>
      <div>
        <p className="text-xs font-black text-slate-700">{item.label}</p>
        <p className="text-[10px] text-slate-400">{item.desc}</p>
      </div>
    </label>
  )
}

function CheckRow({ item, profile, handleChange }) {
  const checked = profile[item.name]
  return (
    <label className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border-2 transition-all
      ${checked ? 'border-slate-300 bg-slate-50' : 'border-transparent hover:border-slate-100 bg-transparent'}`}>
      <input type="checkbox" name={item.name} checked={checked} onChange={handleChange} className="sr-only" />
      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all
        ${checked ? 'bg-slate-700 border-slate-700' : 'border-slate-300 bg-white'}`}>
        {checked && <Check size={11} className="text-white" strokeWidth={3} />}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-700">{item.label}</p>
        {item.desc && <p className="text-[10px] text-slate-400">{item.desc}</p>}
      </div>
    </label>
  )
}

function SectionBlock({ label, icon, color, children }) {
  const colorMap = {
    rose: 'bg-rose-50 border-rose-100 text-rose-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
  }
  return (
    <div className={`rounded-2xl border p-4 ${colorMap[color]}`}>
      <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <span>{icon}</span> {label}
      </p>
      <div className="space-y-1 text-slate-700">
        {children}
      </div>
    </div>
  )
}