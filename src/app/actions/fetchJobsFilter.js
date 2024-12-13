"use server"

import { prisma } from "@/lib/prisma";

export async function fetchJobsFilter({ searchTerm, jobType, experienceLevel, location }){

  const filters = {
    ...(searchTerm && {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { keywords: { has: searchTerm } },
      ],
    }),
    ...(jobType && jobType !== "All" && { category: jobType }),
    ...(location && location !== "All" && { location }),
  };

  try {
    const jobs = await prisma.jobListing.findMany({
      where: filters,
      include: {
        employer: true,
      },
    });

    return { status: 'ok', jobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { status: 'failed' };
  }
}