'use client'

import React, { useState } from 'react';
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
import { Textarea } from './ui/textarea';

const companySettingsSchema = z.object({
  name: z.string().min(3, "Job title is required"),
  slug: z.string().optional(),
  email: z.string().min(3, "email is required"),
  mobile: z.number().min(10, 'Please recheck your number').optional(),
  bio: z.string().optional(),
  tagline: z.string().optional(),
  desc: z.string().optional(),
  founded: z.string().optional(),
  size: z.string().optional(),
  website: z.string().optional(),
  location: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export default function CompanySettingsForm({ onSave, preloadValues }) {

  const [imageUrl, setImageUrl] = useState(preloadValues.image || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      name: preloadValues.name || '',
      slug: preloadValues.slug || '',
      email: preloadValues.email || '',
      location: preloadValues.location || '',
      category: '',
      tagline: preloadValues.tagline || '',
      desc: preloadValues.desc || '',
      founded: preloadValues.founded || '',
      size: preloadValues.size || '',
      website: preloadValues.website || ''
    },
  });

  const handleCompanyLogoUpload = async(e) => {
    const file = e.target.files[0];
    const { url } = await uploadToBlob(file);
    setValue('image', url)
    setImageUrl(url);
  }

  const onSubmit = (data) => {
    console.log('Form submitted', data);
    onSave({...data, imageUrl})
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Company details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input 
              id="name" 
              placeholder="Company Name" 
              {...register('name')} 
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug / url</Label>
            <Input 
              id="slug" 
              placeholder="Example. louis-vitton" 
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
              <input type='file' onChange={handleCompanyLogoUpload} accept='image/png, image/jpeg' hidden/>
            </label>
            : 
            <label>
              <div className='border-2 border-dashed h-10 flex justify-center gap-1 items-center text-xs'> <File size="14" className='text-gray-600' /> Upload your Logo</div>
              <input type='file' onChange={handleCompanyLogoUpload} accept='image/png, image/jpeg' hidden/>
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
            <Label htmlFor="tagline">tagline</Label>
            <Input 
              id="tagline" 
              placeholder="tagline" 
              {...register('tagline')} 
            />
            {errors.tagline && <p className="text-red-500">{errors.tagline.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea 
              id="desc" 
              placeholder="Short description" 
              {...register('desc')} 
            />
            {errors.tagline && <p className="text-red-500">{errors.tagline.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="founded">Founding Year</Label>
            <Input 
              id="founded" 
              placeholder="e.g 2006" 
              {...register('founded')} 
            />
            {errors.founded && <p className="text-red-500">{errors.founded.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">website</Label>
            <Input 
              id="website" 
              placeholder="website" 
              {...register('website')} 
            />
            {errors.website && <p className="text-red-500">{errors.website.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input 
              id="size" 
              placeholder="Company size" 
              {...register('size')} 
            />
            {errors.size && <p className="text-red-500">{errors.size.message}</p>}
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
          
          <Button type="submit" className="w-full">Save Data</Button>
        </form>
      </CardContent>
    </Card>
  );
}
