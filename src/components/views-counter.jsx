"use client"
import { useEffect, useState } from "react";

export default function ViewsCounter({ slug }){
    const [views, setViews] = useState();

    useEffect(() => {
        const incrementViews = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/inc/${slug}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const res = await response.json();
                    setViews(res.data);
                } else {
                    console.error('Failed to increment views');
                }
            } catch (error) {
                console.error('Error incrementing views:', error);
            }
        };

        incrementViews();
    }, [slug]);

    return <p>{views}</p>
}