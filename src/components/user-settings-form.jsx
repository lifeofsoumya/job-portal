'use client'

import React, { useEffect, useMemo, useState } from 'react';
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
import Image from 'next/image';

const userSettingsSchema = z.object({
  name: z.string().min(3, "Job title is required"),
  slug: z.string().optional(),
  email: z.string().min(3, "email is required"),
  bio: z.string().optional(),
  location: z.string().optional(),
  salary: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  resume: z.string().optional(),
  // experiences: z.array(
  //   z.object({
  //     companyName: z.string().min(1, "Company name is required"),
  //     role: z.string().min(1, "Role is required"),
  //     startDate: z.string().min(1, "Start date is required"),
  //     endDate: z.string().optional(),
  //     description: z.string().optional(),
  //   })
  // ).optional(),
});

export default function UserSettingsForm({ onSave, preloadValues }) {
  const [keywordInput, setKeywordInput] = useState('');
  const initialKeywords = useMemo(() => {
    return preloadValues.skills || [];
  }, [preloadValues]);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [imageUrl, setImageUrl] = useState(preloadValues.image || '');

  const [resumeUploaded, setResumeUploaded] = useState(!!preloadValues.resume); // holds boolean only
  const initialExperiences = useMemo(() => preloadValues.experiences || [], [preloadValues]);
  const [experiences, setExperiences] = useState(initialExperiences);

  // useEffect(()=> {
  //   console.log(preloadValues, ' pre loaded')
  // }, [preloadValues])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: preloadValues.name || '',
      slug: preloadValues.slug || '',
      email: preloadValues.email || '',
      bio: preloadValues.bio || '',
      location: preloadValues.location || '',
      salary: preloadValues.salary || '',
      keywords: preloadValues.skills || [],
      resume: preloadValues.resume || '',
      // experiences: preloadValues.experiences || [],
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

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    const { url } = await uploadToBlob(file);
    setValue('image', url)
    setImageUrl(url);
  }

  const handleResumeUpload = async(e) => {
    const file = e.target.files[0];
    const { url } = await uploadToBlob(file);
    setValue('resume', url)
    setResumeUploaded(true);
  }

  const addExperience = () => {
    console.log(experiences, ' before adding the exisitng experience')
    setExperiences([...experiences, { companyName: '', role: '', startDate: '', endDate: '', description: '' }]);
    setValue('experiences', [...experiences, { companyName: '', role: '', startDate: '', endDate: '', description: '' }]);
  };

  // const handleExperienceChange = (index, field, value) => {
  //   const updatedExperiences = experiences.map((experience, i) => 
  //     i === index ? { ...experience, [field]: value } : experience
  //   );
  //   setExperiences(updatedExperiences);
  //   setValue('experiences', updatedExperiences);
  // };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setExperiences(updatedExperiences);
    // setValue('experiences', updatedExperiences);
  };

  const removeExperience = (indexToRemove) => {
    const newExperiences = experiences.filter((_, index) => index !== indexToRemove);
    setExperiences(newExperiences);
    // setValue('experiences', newExperiences);
  };

  const onSubmit = (data) => {
    console.log(data, ' data in user form')
    onSave({...data, experiences, imageUrl})
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your details</CardTitle>
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
            <Label htmlFor="slug">Slug / url</Label>
            <Input 
              id="slug" 
              placeholder="Example. john-doe" 
              {...register('slug')} 
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="resume">Image</Label>
            {imageUrl
            ? 
            <label>
              <Image className='py-3' src={imageUrl} width={70} height={70} alt={"Company Logo"} />
              <div className='border-2 border-dashed h-10 flex justify-center gap-1 items-center text-xs'> <File size="14" className='text-gray-600' /> Change Logo</div>
              <input type='file' onChange={handleImageUpload} accept='image/png, image/jpeg' hidden/>
            </label>
            : 
            <label>
              <div className='border-2 border-dashed h-10 flex justify-center gap-1 items-center text-xs'> <File size="14" className='text-gray-600' /> Upload your Logo</div>
              <input type='file' onChange={handleImageUpload} accept='image/png, image/jpeg' hidden/>
            </label>}
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
            <Label htmlFor="bio">Bio</Label>
            <Input 
              id="bio" 
              placeholder="Bio" 
              {...register('bio')} 
            />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Company Location" 
              {...register('location')} 
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
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

          <div className="space-y-2">
            <Label className="pr-4">Job Experiences</Label>
            {experiences.map((experience, index) => (
              <div key={index} className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                    placeholder="Company Name"
                    className="w-full sm:w-auto"
                    defaultValue={experience.companyName}
                  />
                  <Input
                    onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                    placeholder="Role"
                    defaultValue={experience.role}
                  />
                  <Input
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    placeholder="Start Date"
                    defaultValue={preloadValues.experiences.length ? new Date(experience.startDate || Date.now()).toISOString().split('T')[0] : null}
                    type="date"
                  />
                  <Input
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    placeholder="End Date"
                    defaultValue={preloadValues.experiences.length ? new Date(experience.endDate || Date.now()).toISOString().split('T')[0] : null}
                    type="date"
                  />
                </div>
                <div>
                  <Input
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    placeholder="Description (Optional)"
                    defaultValue={experience.description}
                  />
                </div>
                <Button type="button" onClick={() => removeExperience(index)} variant="destructive">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addExperience}>Add Job Experience</Button>
          </div>
          <Button type="submit" className="w-full">Save Data</Button>
        </form>
      </CardContent>
    </Card>
  );
}