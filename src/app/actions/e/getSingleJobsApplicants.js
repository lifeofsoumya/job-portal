import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma";

export default async function getSingleJobsApplicants(jobId) {
    
    const session = await getAuthSession();

    const jobListing = await prisma.jobListing.findUnique({
        where: { id: jobId },
        select: { employerId: true }
    });

    if (!jobListing || jobListing.employerId !== session.user.id) {
        return { status: 'failed' }
    }

    const applicants = await prisma.jobApplication.findMany({
        where: { jobListingId: jobId },
        select: {
            status: true,
            salary: true,
            name: true,
            email: true,
            resume: true,
            skills: true,
            applicant: {
                select: {
                    id: true,
                    location: true,
                    image: true,
                    experiences: true,
                }
            }
        }
    });

    return { status: 'ok', applicants : applicants.map(application => ({
        status: application.status,
        salary: application.salary,
        resume: application.resume,
        name: application.name,
        email: application.email,
        skills: application.skills,
        id: application.applicant.id,
        location: application.applicant.location,
        image: application.applicant.image,
        experiences: application.applicant.experiences,
    })
)};
}
