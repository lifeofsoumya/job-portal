import userRole from "@/utils/role";

export default async function ApplicationsLayout({ children }){
    const role = await userRole();
    const isAdmin = 'ADMIN' == role;
    const isEmployer = 'EMPLOYER' == role;

    if (!isAdmin && !isEmployer) return <section>
        Cannot access
    </section>

    return <section className="p-8">
    { children }
    </section>
}