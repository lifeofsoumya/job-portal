"use server"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function addApplication(jobId, data) {
    const session = await getAuthSession();
    if (!session) return { status: "Rejected" }

    const existingApplication = await prisma.jobApplication.findFirst({
        where: {
            jobListingId: jobId,
            applicantId: session.user.id,
        }
    })

    if (existingApplication) {
        return { status: "failed", message: "Already Applied" };
    }

    const result = await prisma.$transaction(async (prisma) => {
        
        const newApplication = await prisma.jobApplication.create({
            data: {
                jobListingId: jobId,
                applicantId: session.user.id,
                name: data.name,
                email: data.email,
                phone: parseInt(data.mobile) || null,
                salary: data.salary,
                skills: data.keywords,
                resume: data.resume
            }
        });

        const updatedJobListing = await prisma.jobListing.update({
            where: { id: jobId },
            data: {
                numapplications: {
                    increment: 1
                }
            }
        });

        return { newApplication, updatedJobListing };
    });


    return { status: "ok" }
}
