"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Teste() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id") || "";

    return (
        <>
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
                <div className="text-white text-6xl">You are logged in !!!!</div>
                <div className="text-white text-sm text-center">Your session_id is {session_id}</div>
            </div>
        </>
    );
}

export default function TesteWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Teste />
        </Suspense>
    );
}
