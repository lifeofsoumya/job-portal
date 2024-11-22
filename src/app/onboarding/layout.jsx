import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import OnboardingPage from './page'
import { authOptions } from '@/lib/auth'

export default async function OnboardingLayout() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/sign-in')
  }

  return <OnboardingPage userId={session.user.id} />
}