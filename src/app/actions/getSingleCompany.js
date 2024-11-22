import { prisma } from "@/lib/prisma";


export default async function getSingleCompany(slug){
    const company = await prisma.user.findUnique({
        where: { slug },
        select: {
            name: true,
            slug: true,
            email: true,
            image: true,
            role: true,
            tagline: true,
            desc: true,
            founded: true,
            size: true,
            website: true,
            location: true,
            createdAt: true,
            jobListings: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    return company
}