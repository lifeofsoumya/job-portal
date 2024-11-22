import getSingleJobDetails from "@/app/actions/getSingleJobDetails";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, DollarSign, Clock, Building, Users, Globe, Bolt, IndianRupee, FileUser, Eye } from 'lucide-react'
import Link from "next/link";
import { formatMoney } from "@/utils/formatMoney";
import ViewsCounter from "@/components/views-counter";
import JobApplyForm from "@/components/apply-to-job-form";
import preloadUserData from "@/utils/preloaduser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default async function JobDetailsPage({ params }) {
  const { id } = params;
  const job = await getSingleJobDetails(id);
  const user = await preloadUserData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                  <CardDescription className="text-lg">{job.employer.name}</CardDescription>
                </div>
                <Badge variant="secondary">{new Date(job.createdAt).toLocaleDateString()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <IndianRupee className="mr-2 h-4 w-4" />
                  <span>{formatMoney(job.salary)}</span>
                </div>
                <div className="flex items-center">
                  <Bolt className="mr-2 h-4 w-4" />
                  <span>{job.category}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  <span className="flex gap-2"><ViewsCounter slug={id} /> Views</span>
                </div>
                <div className="flex items-center">
                  <FileUser className="mr-2 h-4 w-4" />
                  <span>{job.numapplications} Applications</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* <Link href={`/apply/${job.id}`} className="w-full bg-black text-white rounded-md p-2 text-center">Apply Now</Link> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="">Apply</Button>
                </DialogTrigger>
                <DialogContent >
                  <JobApplyForm jobId={id} preloadValues={user}/>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key skills</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              {
                job.keywords.map(k=> <span className="bg-black px-3 py-1 rounded-full text-white">{k}</span>)
              }
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4" dangerouslySetInnerHTML={{__html: job.description.replace(/\n/g, '<br />')}}></p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href={`/company/${job.employer.slug}`}>
                  <h3 className="font-semibold">{job.employer.name}</h3>
                  <p className="text-sm text-muted-foreground">{job.employer.tagline}</p>
                </Link>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span className="text-sm">{job.employer.size} employees</span>
                </div>
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span className="text-sm">Founded in {job.employer.founded}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <a href={job.employer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    Company Website
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  )
}