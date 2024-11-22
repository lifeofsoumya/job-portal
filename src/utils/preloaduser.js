import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function preloadUserData() {
    const session = await getAuthSession();
    if (!session) return null;
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { 
            name: true,
            email: true, 
            resume: true, 
            skills: true, 
            salary: true, 
            // experience: true, 
            contact: true 
        }
    })
    return user;
}