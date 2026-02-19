'use client'

import { useAuth } from '@/app/components/AuthProvider'
import HealthProfileForm from '@/app/components/HealthProfileForm'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function HealthProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const {data:session, status}=useSession()
console.log(status)
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/auth/signup')
  //   }
  // }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <HealthProfileForm />
}