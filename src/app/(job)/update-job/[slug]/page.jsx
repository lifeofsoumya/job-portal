import JobAddFormComponent from "@/components/add-job-form";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function JobAddPage({ params }){
    const { slug } = params;
    const jobPreload = await prisma.jobListing.findUnique({
        where: { id: slug }
    })

    return <section>
        <JobAddFormComponent jobId={slug} preloadValues={jobPreload}/>
    </section>
}