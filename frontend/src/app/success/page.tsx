"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function StatsPage() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id") || "";
    console.log("Session ID:", session_id);

    return (
        <div className="w-screen h-screen p-4">

        </div>
    );
}

export default function TesteWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StatsPage />
        </Suspense>
    );
}
