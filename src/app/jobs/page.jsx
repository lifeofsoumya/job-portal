'use client'

import { Search, Briefcase, MapPin, Filter } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useEffect, useState } from 'react'
import { fetchJobsFilter } from '../actions/fetchJobsFilter'
import { useRouter, useSearchParams } from 'next/navigation'

// // Mock job data
// const jobsData = [
//   { id: 1, title: "Frontend Developer", company: "TechCorp", type: "Full-time", experience: "Mid-level", location: "New York" },
//   { id: 2, title: "Backend Engineer", company: "DataSys", type: "Part-time", experience: "Senior", location: "San Francisco" },
//   { id: 3, title: "UX Designer", company: "DesignHub", type: "Contract", experience: "Entry-level", location: "London" },
//   { id: 4, title: "Data Scientist", company: "AI Innovations", type: "Full-time", experience: "Senior", location: "Berlin" },
//   { id: 5, title: "DevOps Engineer", company: "CloudTech", type: "Full-time", experience: "Mid-level", location: "Tokyo" },
// ]

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("All")
  // const [experienceLevel, setExperienceLevel] = useState("All")
  const [location, setLocation] = useState("All")
  const [filteredJobs, setFilteredJobs] = useState()
  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchJobs = async () => {
    try {
      const response = await fetchJobsFilter({ searchTerm, jobType, location });
      if (response.status !== 'ok') throw new Error("Failed to fetch jobs");
      setFilteredJobs(response.jobs);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchJobs, 800);
    return ()=> clearTimeout(timer)
  }, [searchTerm, jobType, location]);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar className="w-64 border-r px-3 bg-gray-100">
          <SidebarHeader className="bg-gray-100">
            <div className="p-4">
              <h2 className="text-lg font-semibold">Job Filters</h2>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-gray-100">
            <SidebarGroup>
              <SidebarGroupLabel>Job Type</SidebarGroupLabel>
              <SidebarGroupContent>
                <RadioGroup value={jobType} onValueChange={setJobType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="All" id="all-types" />
                    <Label htmlFor="all-types">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Technology" id="Technology" />
                    <Label htmlFor="Technology">Technology</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Marketing" id="Marketing" />
                    <Label htmlFor="Marketing">Marketing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Finance" id="Finance" />
                    <Label htmlFor="Finance">Finance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Healthcare" id="Healthcare" />
                    <Label htmlFor="Healthcare">Healthcare</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Education" id="Education" />
                    <Label htmlFor="Education">Education</Label>
                  </div>
                </RadioGroup>
              </SidebarGroupContent>
            </SidebarGroup>
            {/* <SidebarGroup>
              <SidebarGroupLabel>Experience Level</SidebarGroupLabel>
              <SidebarGroupContent>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Entry-level">Entry-level</SelectItem>
                    <SelectItem value="Mid-level">Mid-level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarGroupContent>
            </SidebarGroup> */}
            <SidebarGroup>
              <SidebarGroupLabel>Top Locations</SidebarGroupLabel>
              <SidebarGroupContent>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Noida">Noida</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="p-3">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-4">
              {filteredJobs?.map((job) => (
                <div key={job.id} className="rounded-lg border p-4 shadow-sm flex flex-col sm:flex-row gap-3 justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm">
                            <span className="flex items-center">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {job.type}
                            </span>
                            <span className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                            </span>
                        </div>
                    </div>
                    <div className='flex sm:flex-col gap-2'>
                      <Button onClick={()=> router.push(`/jobs/${job.id}`)} size="lg">Apply now</Button>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}