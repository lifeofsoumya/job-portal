import { getAuthSession } from "@/lib/auth"

export default async function getAllPostedJobs(){
    const session = await getAuthSession();
    const res = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { 
            jobListings: {
                select: {
                    id: true,
                    title: true,
                    numapplications: true,
                    location: true,
                }
            }
        }
    })
    return res
}