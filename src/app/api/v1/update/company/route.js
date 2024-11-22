import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request){
    const { name, slug, email, imageUrl, bio, tagline, desc, founded, size, website, location, keywords } = await request.json();

    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({ message: "Not authorized"}, { status: 403})

    const company = await prisma.user.findUnique({
        where: { id: session.user.id }
    })

    if(!company) return NextResponse.json({ message: "Not a company"}, { status: 404})

    try {
        const updatedCompany = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                slug,
                email,
                image: imageUrl,
                tagline,
                desc,
                founded,
                size,
                website,
                location,
            }
        })
        return NextResponse.json({ updatedCompany }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


    

}