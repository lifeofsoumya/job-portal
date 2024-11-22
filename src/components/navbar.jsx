import { getAuthSession } from "@/lib/auth";
import userRole from "@/utils/role";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default async function Navbar({ props }){

    const role = await userRole();

    const navLinksConfig = {
        JOB_SEEKER: [
            { href: "/jobs", label: "Find Jobs" },
            { href: "/my-applications", label: "My Applications" },
            { href: "/settings", label: "Settings" },
        ],
        EMPLOYER: [
            { href: "/add-job", label: "Add Job" },
            { href: "/applications", label: "Submissions" },
            { href: "/settings", label: "For Employers" },
        ],
    };

    const linksToShow = navLinksConfig[role] || [];

    return <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
            <Briefcase className="h-6 w-6" />
            <span className="sr-only">GeekJOBS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
            {linksToShow.map((link) => (
                <Link key={link.href} className="text-sm font-medium hover:underline underline-offset-4" href={link.href}>
                    {link.label}
                </Link>
            ))}
        </nav>
        { !role && <Link className="text-sm font-medium hover:underline underline-offset-4" href={'/sign-in'}>Sign in</Link>}
    </header>
}