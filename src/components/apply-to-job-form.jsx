'use client'

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { File, X } from "lucide-react";
import { uploadToBlob } from '@/utils/upload';
import { addApplication } from '@/app/actions/addApplication';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const userApplicationSchema = z.object({
  name: z.string().min(3, "Job title is required"),
  email: z.string().min(3, "email is required"),
  salary: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  resume: z.string().min(5, "Please attach a resume")
});

export default function JobApplyForm({ jobId, preloadValues }) {
  const [keywordInput, setKeywordInput] = useState('');
  const initialKeywords = useMemo(() => {
    return preloadValues.skills || [];
  }, [preloadValues.skills]);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [resumeUploaded, setResumeUploaded] = useState(!!preloadValues.resume); // holds boolean only
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(userApplicationSchema),
    defaultValues: {
      name: preloadValues.name || '',
      email: preloadValues.email || '',
      location: '',
      category: '',
      salary: '',
      keywords: preloadValues.skills || [],
      resume: preloadValues.resume || '',
    },
  });

  const handleKeywordInputChange = (e) => {
    setKeywordInput(e.target.value);
  };

  const handleKeywordInputKeyDown = (e) => {
    if ((e.key === ',' || e.key === 'Enter') && keywordInput.trim()) {
      e.preventDefault();
      const newKeywords = [...keywords, keywordInput.trim()];
      setKeywords(newKeywords);
      setValue('keywords', newKeywords); // Update the form state
      setKeywordInput('');
    }
  };

  const removeKeyword = (indexToRemove) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove);
    setKeywords(newKeywords);
    setValue('keywords', newKeywords); // Update the form state
  };

  const handleResumeUpload = async(e) => {
    const file = e.target.files[0];
    const { url } = await uploadToBlob(file);
    setValue('resume', url)
    setResumeUploaded(true);
  }

  const onSubmit = async (data) => {
    try {
      const res = await addApplication(jobId, data)
      console.log(res.status, ' res')
      if(res.status == 'ok') {
        toast({
          title: "Applied successfully!"
        })
        router.push('/my-applications')
      } else if (res.status == 'failed'){
        toast({
          title: res.message
        })
      }
    } catch (error) {
      console.log('error in adding application', error)
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Enter your details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Candidate Name</Label>
            <Input 
              id="name" 
              placeholder="Candidate Name" 
              {...register('name')} 
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              placeholder="Enter your email" 
              {...register('email')} 
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Expected salary</Label>
            <Input 
              id="salary" 
              placeholder="Expected salary" 
              {...register('salary')} 
            />
            {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {keywords.map((keyword, index) => (
                <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                  {keyword}
                  <button type="button" onClick={() => removeKeyword(index)} className="ml-2 focus:outline-none">
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
            <Input
              id="keywords"
              value={keywordInput}
              onChange={handleKeywordInputChange}
              onKeyDown={handleKeywordInputKeyDown}
              placeholder="Type keywords and press comma to add"
            />
          </div>
          <div>
            <Label htmlFor="resume">Resume</Label>
            {resumeUploaded
            ? 
            <label>
              <div className='border-2 border-dashed h-10 flex justify-center gap-1 items-center text-xs'> <File size="14" className='text-gray-600' /> Change resume</div>
              <input type='file' onChange={handleResumeUpload} accept='application/pdf,application/docx' hidden/>
            </label>
            : 
            <label>
              <div className='border-2 border-dashed h-10 flex justify-center gap-1 items-center text-xs'> <File size="14" className='text-gray-600' /> Upload your resume</div>
              <input type='file' onChange={handleResumeUpload} accept='application/pdf,application/docx' hidden/>
            </label>}
          </div>
          <div className='text-xs'>
            <p className='text-gray-800'>*Your past employment history would be shared with the Employer</p>
          </div>
          <Button type="submit" className="w-full">Submit Application</Button>
        </form>
      </CardContent>
    </div>
  );
}
