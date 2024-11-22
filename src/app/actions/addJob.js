"use server"

import { prisma } from "@/lib/prisma";


export default async function addJob(userId, data) {
    const { title, description, location, category, salary, keywords } = data;

    const newJob = await prisma.jobListing.create({
        data: {
            title,
            description,
            location,
            category,
            salary,
            keywords,
            employerId: userId
        }
    })
    console.log(newJob, 'newJob')
    return newJob?.id
}