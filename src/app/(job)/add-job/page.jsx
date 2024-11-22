import JobAddFormComponent from "@/components/add-job-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function JobAddPage(){
    const session = await getServerSession(authOptions);
    if(!session.user){
        return <section>
            Need to login
        </section>
    }


    return <section>
        <JobAddFormComponent userId={session.user.id} />
    </section>
}