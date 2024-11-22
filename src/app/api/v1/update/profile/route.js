import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const validateDateRange = (startDate, endDate) => {
    if (endDate && new Date(endDate) < new Date(startDate)) {
        throw new Error("End date cannot be earlier than start date");
    }
};

export async function POST(request){
    const { name, slug, email, imageUrl, bio, location, salary, keywords, resume, experiences } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json({ message: "Not authorized" }, { status: 403 });

    const company = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    if (!company) return NextResponse.json({ message: "Not a company" }, { status: 404 });

    try {
        if (experiences && Array.isArray(experiences)) {
            for (const experience of experiences) {
                validateDateRange(experience.startDate, experience.endDate);
            }
        }

        // Fetch existing experiences for the user
        const existingExperiences = await prisma.experience.findMany({
            where: { userId: session.user.id },
        });

        // Prepare updates and creations
        const updates = [];
        const creations = [];
        const deletions = [];

        const incomingExperienceIds = new Set(experiences.map((experience) => experience.id));


        console.log(experiences, ' experiences')
        console.log(existingExperiences, 'existing experiences')

        experiences.forEach((experience) => {
            const existingExperience = existingExperiences.find(
                (exp) => exp.id == experience.id
            );

            if (existingExperience) {
                // Update existing experience
                updates.push(
                    prisma.experience.update({
                        where: { id: existingExperience.id },
                        data: {
                            companyName: experience.companyName,
                            role: experience.role,
                            startDate: new Date(experience.startDate),
                            endDate: experience.endDate ? new Date(experience.endDate) : null,
                            description: experience.description || null,
                        },
                    })
                );
            } else {
                // Create new experience
                creations.push(
                    prisma.experience.create({
                        data: {
                            userId: session.user.id,
                            companyName: experience.companyName,
                            role: experience.role,
                            startDate: new Date(experience.startDate),
                            endDate: experience.endDate ? new Date(experience.endDate) : null,
                            description: experience.description || null,
                        },
                    })
                );
            }
        });

        existingExperiences.forEach((existingExperience) => {
            if (!incomingExperienceIds.has(existingExperience.id)) {
                // Mark for deletion if the ID is not in the incoming array
                deletions.push(
                    prisma.experience.delete({
                        where: { id: existingExperience.id },
                    })
                );
            }
        });

        // Execute all updates and creations
        await prisma.$transaction([...updates, ...creations, ...deletions]);

        // Update the user's other fields
        const updatedCompany = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                slug,
                email,
                image: imageUrl,
                bio,
                location,
                salary,
                skills: keywords,
                resume,
            },
        });

        return NextResponse.json({ updatedCompany }, { status: 200 });
    } catch (error) {
        console.error("Error updating user and experiences: ", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
