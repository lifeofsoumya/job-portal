import CompanySettingsPage from "@/components/pages/company-settings-page";
import UserSettingsPage from "@/components/pages/user-settings-page";
import { toast } from "@/hooks/use-toast";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function UserSettings(){
    // const company = {
    //     name: 'sam', 
    //     email: 'mondal@gmail.com',
    //     skills: ['js', 'ts'],
    //     image: "https://pog1urzayxc6utws.public.blob.vercel-storage.com/become-backend-dev-VfTKVsJ3AJI6VuD1Qbxc91yA7B122J.png"
    // }
    const session = await getServerSession(authOptions);
    
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true } 
    })

    if(!user) return notFound();
    
    if(user.role === "EMPLOYER") {

        const company = await prisma.user.findUnique({
            where: { id: session.user.id},
            select: { 
                name: true,
                slug: true,
                email: true,
                image: true,
                role: true,
                tagline: true,
                desc: true,
                founded: true,
                size: true,
                website: true,
                location: true
            }
        })

        return <section className="p-4">
                <CompanySettingsPage company={company} />
            </section>
    }

    else {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id},
            select: { 
                name: true,
                slug: true,
                email: true,
                bio: true, 
                location: true,
                image: true,
                salary: true,
                skills: true,
                resume: true,
                experiences: true,
            }
        })
        return <section className="p-4">
            <UserSettingsPage user={user} />
        </section>
    }
}