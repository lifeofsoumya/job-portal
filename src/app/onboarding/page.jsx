'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updateUserType } from '../actions/onboarding'

export default function OnboardingPage({ userId }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUserTypeSelection = async (userType) => {
    setIsLoading(true)
    const result = await updateUserType(userId, userType)
    setIsLoading(false)

    if (result.success) {
      router.push('/settings')
    } else {
      console.error(result.error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Our Platform</CardTitle>
          <CardDescription>Please select your account type to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleUserTypeSelection('EMPLOYER')}
            disabled={isLoading}
            className="w-full"
          >
            I'm an Organization
          </Button>
          <Button
            onClick={() => handleUserTypeSelection('JOB_SEEKER')}
            disabled={isLoading}
            className="w-full"
          >
            I'm a Job Seeker
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}