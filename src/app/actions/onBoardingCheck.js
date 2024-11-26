'use server'

import { prisma } from '@/lib/prisma'
export async function onBoardingCheck(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if(!user) return null;
    return user.role;
  } catch (error) {
    console.error('Failed to update user type:', error)
    return { success: false, error: 'Failed to update user type' }
  }
}