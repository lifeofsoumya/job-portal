"use server"

import { prisma } from "@/lib/prisma";


export default async function getSingleJobDetails(id) {

    const newJob = await prisma.jobListing.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            createdAt: true,
            location: true,
            salary: true,
            description: true,
            category: true,
            numapplications: true,
            keywords: true,
            employer: {
                select: {
                    name: true, 
                    tagline: true,
                    slug: true,
                    founded: true,
                    size: true,
                    website: true,
                }
            }
        }
    })
    return newJob
}