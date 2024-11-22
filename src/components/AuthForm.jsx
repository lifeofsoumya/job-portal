"use client";

import { signIn } from 'next-auth/react'
import { Icons } from './icons'
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const AuthForm = ({ origin = 'signUp'}) => {
    const [loading, setLoading] = useState(false)
    const {toast} = useToast(); 

    const loginWithGoogle = async () => {
        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'Uh oh!',
                description: error.message,
                variant: 'destructive' 
            })
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='w-full md:w-2/5 relative mx-4 rounded-md space-y-7 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 px-4 py-6'>
        <Icons.Logo className="w-8 h-8 text-white" />
        <p className='text-gray-300 text-center px-5'>{ origin == 'signUp' ? 'Welcome, by continuing you\'ll Log in to GeekCMS platform' : 'Welcome back'} </p>
        <button onClick={loginWithGoogle} size="sm" className="w-full flex gap-3 items-center justify-center text-md font-bold py-3 border border-gray-500 bg-gray-400/10 hover:bg-gray-500/20 transition-all duration-400 rounded-lg" >
            {origin == 'signUp' ? 'Sign up' : 'Sign in'} {loading ? null : <Icons.GoogleIcon className="w-5 h-5" />}
        </button>
        { origin == 'signUp' 
            ? <span className='text-sm'>Already have an account? <Link className='underline' href="/sign-in">Sign In</Link></span>
            : <span className='text-sm'>New to GeekCMS? <Link className='underline' href="/sign-up">Sign up</Link></span>
        }
    </div>
  )
}

export default AuthForm