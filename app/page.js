// 'use client'

// import { useAuth } from './components/AuthProvider'
// import LandingPage from './components/LandingPage'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// export default function Home() {
//   const { user, loading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading && user) {
//       router.push('/dashboard')
//     }
//   }, [user, loading, router])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   return <LandingPage />
  
// }

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LandingPage from './components/LandingPage'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(status)
    // Only act when NextAuth confirms login
    if (status !== 'authenticated') return

    if (!session.user.hasHealthProfile) {
      router.replace('/auth/health-profile')
      return
    }

    router.replace('/dashboard')
  }, [session, status, router])

  return <LandingPage />
}
