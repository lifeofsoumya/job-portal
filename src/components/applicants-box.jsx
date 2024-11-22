"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { selectCandidate } from '@/app/actions/e/selectCandidate'
import { useRouter } from 'next/navigation'
import { CircleArrowRight } from 'lucide-react'

const ApplicantsBox = ({ ap, jobId }) => {
    const router = useRouter()
    async function handleSelectCandidate({userId, jobId, type }){
        try {
            await selectCandidate({userId, jobId, type });
        } catch (error) {
            console.log(error)
        } finally {
            router.refresh()
        }
    }
  return (
    <div key={ap.id} className="bg-gray-400/30 p-2 rounded space-y-1">
            <Image src={ap.image} width={40} height={40} />
            <p className='text-lg font-bold'>{ap.name}</p>
            <p>{ap.email}</p>
            <p>Based of: {ap.location}</p>
            <p>Salary expected: {ap.salary}</p>
            <p className='flex items-center gap-2'>Resume url: <a className='flex items-center gap-2' href={ap.resume}>Here <CircleArrowRight /></a></p>
            <div>
                Skills: {ap.skills?.map(skill=> <span className='px-3 bg-gray-800 text-white rounded-xl mr-2'>{skill}</span>)}
            </div>
            <div className='bg-black/40 h-[0.5px] w-full'/>
            <label>work experiences</label>
            <div className="flex gap-2 py-2">
                {ap.experiences.map(exp=> <div className='bg-gray-900/20 p-3 rounded'>
                    <h5>Worked at: {exp.companyName}</h5>
                    <h6>As: {exp.role}</h6>
                    <p>From: {new Date(exp.startDate).toLocaleDateString('en-In', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
                    <p>Till: {new Date(exp.endDate).toLocaleDateString('en-In', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
                </div>)}
            </div>
            <span className='space-x-2'>
                <span>Status: {ap.status}</span>
                { ap.status != 'SHORTLISTED' && <Button onClick={()=> handleSelectCandidate({userId: ap.id, jobId, type: "SHORTLISTED" })}>ShortList</Button>}
                { ap.status != 'SELECTED' && <Button onClick={()=> handleSelectCandidate({userId: ap.id, jobId, type: "SELECTED" })}>Select</Button>}
            </span>
        </div>
  )
}

export default ApplicantsBox