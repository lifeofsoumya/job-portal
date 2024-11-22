import getAllPostedJobs from "../actions/e/getAllPostedJobs"
import Link from "next/link"

export default async function AllJobsAndSubmissions(){
    const { jobListings } = await getAllPostedJobs()
    return <div className="flex flex-col gap-4">
        <h1>Jobs posted:</h1>
        {jobListings.map((each, index)=> { 
            return <div key={each.id} className="rounded-lg border p-4 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
            <div>
                <h3 className="text-lg capitalize font-bold">{each.title}</h3>
                <p className="mt-2 flex items-center space-x-4 text-sm">Applicants: {each.numapplications}</p>
                <p className="mt-2 flex items-center space-x-4 text-sm">Location: {each.location}</p>
            </div>
            <div className='flex gap-2'>
              <Link href={`/applications/${each.id}`} className="px-3 py-2 rounded bg-gray-800 text-white h-fit" size="lg">See applicants</Link>
              <Link href={`/update-job/${each.id}`} className="px-5 py-2 rounded mx-auto text-white bg-gray-400 h-fit" size="lg" variant="outline">Update Job</Link>
              <Link href={`/jobs/${each.id}`} className="px-3 py-2 rounded  h-fit" size="lg">View Job</Link>
            </div>
        </div>
        })}
    </div>
}