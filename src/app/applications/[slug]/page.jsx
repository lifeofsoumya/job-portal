import getSingleJobsApplicants from "@/app/actions/e/getSingleJobsApplicants";
import ApplicantsBox from "@/components/applicants-box";
import { notFound } from "next/navigation";


export default async function Applications({ params }){
    const { slug } = params;

    const res = await getSingleJobsApplicants(slug);

    if(res.status == 'failed') return notFound();

    return <section className="space-y-4">
        {/* {JSON.stringify(res)} */}
        <h1 className="text-2xl font-bold">Applicants:</h1>
        {res.applicants.map(ap => <ApplicantsBox ap={ap} jobId={slug} />)}
    </section>
}