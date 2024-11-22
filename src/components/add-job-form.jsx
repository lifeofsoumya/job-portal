'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import addJob from '@/app/actions/addJob';
import updateJob from '@/app/actions/updateJob';

const categoryArr = ['Technology', 'Marketing', 'Finance', 'Healthcare', 'Education']

const jobListingSchema = z.object({
  title: z.string().min(3, "Job title is required"),
  description: z.string().min(10, "Job description is required"),
  location: z.string().min(1, "Location is required"),
  category: z.enum(categoryArr),
  salary: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});


export default function JobAddFormComponent({ userId, jobId, preloadValues }) {
  const [keywordInput, setKeywordInput] = useState('');

  const initialKeywords = useMemo(() => {
    return preloadValues?.keywords || [];
  }, [preloadValues]);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [selectedCategory, setSelectedCategory] = useState(preloadValues?.category || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      title: preloadValues?.title || '',
      description: preloadValues?.description || '',
      location: preloadValues?.location || '',
      category: preloadValues?.category || '',
      salary: preloadValues?.salary || '',
      keywords: preloadValues?.keywords || [],
    },
  });

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setValue('category', value);
  };

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

  const onSubmit = async(data) => {
    console.log('Form submitted', data);
    try {
      let job;
      if(preloadValues) {
        job = await updateJob(jobId, data); // Call addJob with userId and form data
      } else {
        job = await addJob(userId, data);
      }
      console.log('Job successfully saved with ID:', job);
      // Optionally, reset the form or show a success message
    } catch (error) {
      console.error('Error creating job:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Job Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input 
              id="title" 
              placeholder="Enter job title" 
              {...register('title')} 
              required 
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter job description" 
              {...register('description')} 
              required 
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Enter job location" 
              {...register('location')} 
              required 
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange} value={selectedCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {
                  categoryArr.map(each=> <SelectItem key={each} value={each}>{each}</SelectItem>)
                }
                
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input 
              id="salary" 
              placeholder="Enter salary range" 
              {...register('salary')} 
              required 
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
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

          <Button type="submit" className="w-full">Submit Job Listing</Button>
        </form>
      </CardContent>
    </Card>
  );
}