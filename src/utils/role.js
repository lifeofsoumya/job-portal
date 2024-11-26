import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function userRole(){
    const session = await getAuthSession();
    if(!session) return null;
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role : true }
    })
    if(!user) return null;
    return user.role;
}