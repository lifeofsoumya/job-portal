"use client";

import { toast } from "@/hooks/use-toast";
import CompanySettingsForm from "../company-settings-form";


export default function CompanySettingsPage({ company }) {
    const onSave = async (data) => {
        const res = await fetch(`/api/v1/update/company`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        });
        if(!res.ok){
            toast({
                title: "Uh oh!",
                description: "Couldn't save"
            })
        }
        else return toast({
            title: "Updated company details"
        })
    }
    return <CompanySettingsForm onSave={onSave} preloadValues={company}/>
}