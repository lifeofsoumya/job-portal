import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, UsersIcon, BuildingIcon, MailIcon } from "lucide-react"
import getSingleCompany from "@/app/actions/getSingleCompany";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CompanyPage({ params }) {
    const { slug } = params;
    let company = await getSingleCompany(slug);
    if(!company) return notFound();
  return (
    <div className="p-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <Image
                width={50}
                height={50}
                src={company.image}
                alt="TechCorp Logo"
                className="rounded-full w-24 h-24 object-cover"
              />
              <div className="text-center sm:text-left">
                <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
                <p className="text-muted-foreground">{company.tagline}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {company.desc}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center">
                  <BuildingIcon className="mr-2 h-4 w-4 opacity-70" /> <span>Industry: Technology</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="mr-2 h-4 w-4 opacity-70" /> <span>Company size: {company.size} employees</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4 opacity-70" /> <span>Headquarters: {company.location}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" /> <span>Founded: {company.founded}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Job Openings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {company.jobListings && company.jobListings.map(job => <li className="flex justify-between items-center">
                  <span>{job.title}</span>
                  <Link href={`/jobs/${job.id}`}>See more</Link>
                </li>)
                }
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Website</h3>
                <a href={company.website} className="text-blue-600 hover:underline">
                    {company.website}
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Joined</h3>
                <p>{new Date(company.createdAt).toLocaleDateString('en-In')}</p>
              </div>
              <Link href={`mailto:${company.email}`} className="w-full bg-black text-white rounded flex gap-2 items-center justify-center py-3">
                <MailIcon className="mr-2 h-4 w-4" /> Contact Company
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}