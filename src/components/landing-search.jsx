"use client"

import { useRouter } from "next/navigation"
import { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const LandingSearch = () => {
    const router = useRouter();
    const queryRef = useRef();
    const handleSearchLandingPage = async (e) => {
        e.preventDefault();
        router.push(`/jobs?q=${queryRef.current.value}`)
    }
    return (
        <form onSubmit={handleSearchLandingPage} className="flex space-x-2">
            <Input ref={queryRef} className="max-w-lg flex-1 bg-white" placeholder="Search jobs..." type="text" />
            <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
            </Button>
        </form>
    )
}

export default LandingSearch