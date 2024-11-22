'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateUserType(userId, userType) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: userType },
    })
    revalidatePath('/settings')
    return { success: true }
  } catch (error) {
    console.error('Failed to update user type:', error)
    return { success: false, error: 'Failed to update user type' }
  }
}