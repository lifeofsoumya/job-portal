import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import OnboardingPage from './page'
import { authOptions } from '@/lib/auth'
import { onBoardingCheck } from '../actions/onBoardingCheck'

export default async function OnboardingLayout() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect('/sign-in')
  }

  const onboaringStatus = await onBoardingCheck(session?.user.id);
  if(onboaringStatus !== 'NOT_SET') redirect('/')

  return <OnboardingPage userId={session.user.id} />
}