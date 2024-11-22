import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, BriefcaseIcon, GraduationCapIcon, MailIcon, LinkedinIcon, GithubIcon } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import dateFormat from "@/utils/dateFormat"

export default async function UserProfile({params}) {
  const { slug } = params;

  const user = await prisma.user.findUnique({
    where: { slug },
    include: { 
      experiences: true
    }
  })

  console.log(user, ' user')
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={user.image}
                alt="John Doe's profile picture"
                className="rounded-full w-32 h-32 object-cover"
              />
              <div className="text-center sm:text-left">
                <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                <p className="text-muted-foreground">{user.bio}</p>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
                  <span>{user.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">About Me</h3>
              <p className="mb-4">
                Passionate software engineer with 8+ years of experience in developing scalable web applications.
                Specialized in JavaScript, React, and Node.js. Always eager to learn new technologies and solve complex problems.
              </p>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => <Badge>{skill.toUpperCase()}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="experience" className="mt-6">
            <TabsList>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {user.experiences.map(e=> <div>
                      <h3 className="font-semibold">{e.role} at {e.companyName}</h3>
                      <p className="text-sm text-muted-foreground">{dateFormat(e.startDate)} - {dateFormat(e.endDate)}</p>
                      <p>{e?.description}</p>
                    </div>)}
                    
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm">john.doe@example.com</p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <LinkedinIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <GithubIcon className="h-4 w-4" />
                </Button>
                <Link href={`mailto:${user.email}`} className="flex-1">
                  <MailIcon className="mr-2 h-4 w-4" /> Contact
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}