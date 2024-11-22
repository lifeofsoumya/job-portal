import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }){
    const { slug } = params;
    // const origin = request.headers.get('origin');
    // if(origin !== process.env.NEXT_PUBLIC_BASE_URL) return NextResponse.json({ message: "Not authorized "}, { status: 403})
    try {
        const listing = await prisma.jobListing.findUnique({
            where: { id : slug }
        })
        if(!listing) {
            return NextResponse.json({ message: "No such job found "}, { status: 404})
        }
        const updatedListing = await prisma.jobListing.update({
            where: { id: listing.id },
            data: {
                views: {
                    increment: 1,
                }
            },
            select: {
                views: true
            }
        })
        return NextResponse.json({ message: "Incremented", data: updatedListing.views}, { status: 200 })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: "Could not increment" }, { status: 500})
    }
}