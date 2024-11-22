import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MyApplications(){
    const session = await getAuthSession();

    const applications = await prisma.jobApplication.findMany({
        where: { applicantId: session?.user.id },
        select: {
            appliedAt: true,
            status: true,
            jobListing: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })

    return <section className="p-4 flex flex-col gap-3">
    {/* {JSON.stringify(applications, null, 2)} */}
    {applications.map((each, index)=> { 
            return <div key={each.id} className="rounded-lg border p-4 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
            <div>
                <h3 className="text-lg capitalize font-bold">{each.jobListing.title}</h3>
                <p className="mt-2 flex items-center space-x-4 text-sm">Status: {each.status}</p>
            </div>
            <div className='flex gap-2'>
              <Link href={`/jobs/${each.jobListing.id}`} className="px-3 py-2 rounded  h-fit" size="lg">View Job</Link>
            </div>
        </div>
        })}
    </section>
}