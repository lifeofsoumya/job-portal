import { addApplication } from "@/app/actions/addApplication";
import JobApplyForm from "@/components/apply-to-job-form";
import preloadUserData from "@/utils/preloaduser";

export default async function ({ params }) {
  const { id } = params;
  
  const user = await preloadUserData();

  return <section>
    <JobApplyForm jobId={id} preloadValues={user}/>
  </section>;
}
