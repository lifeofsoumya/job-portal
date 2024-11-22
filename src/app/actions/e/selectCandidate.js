"use server"

export async function selectCandidate({userId, jobId, type }){
    const jobApplication = await prisma.jobApplication.findFirst({
        where: {
          jobListingId: jobId,
          applicantId: userId,
        },
        select: { id: true, status: true }
      });
    console.log(jobApplication, ' jobApplication')
      if (!jobApplication) {
        throw new Error("User has not applied for this job.");
      }
    
      await prisma.jobApplication.update({
        where: { id: jobApplication.id },
        data: {
          status: type,
          updatedAt: new Date(),
        }
      });
    
      return { message: "Candidate SHORTLISTED successfully." };
}