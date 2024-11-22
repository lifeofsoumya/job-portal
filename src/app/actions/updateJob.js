"use server"

import { prisma } from "@/lib/prisma";


export default async function updateJob(jobId, data) {
    const { title, description, location, category, salary, keywords } = data;

    const updatedJob = await prisma.jobListing.update({
        where: { id: jobId},
        data: {
            title,
            description,
            location,
            category,
            salary,
            keywords,
        }
    })
    console.log(updatedJob, 'updatedJob')
    return updatedJob?.id
}