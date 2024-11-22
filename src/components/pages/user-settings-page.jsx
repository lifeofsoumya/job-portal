"use client";

import { toast } from "@/hooks/use-toast";
import UserSettingsForm from "../user-settings-form";


export default function UserSettingsPage({ user }) {
    const onSave = async (data) => {
        const res = await fetch(`/api/v1/update/profile`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await res.json()
        if(!res.ok){
            toast({
                title: "Uh oh!",
                description: response.message
            })
        }
        else return toast({
            title: "Updated user details"
        })
    }
    return <UserSettingsForm onSave={onSave} preloadValues={user}/>
}