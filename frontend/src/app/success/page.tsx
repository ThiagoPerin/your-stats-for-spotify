"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Teste() {
    const searchParams = useSearchParams();
    const token = searchParams.get("access_token") || "";
    console.log(token);

    return (
        <>
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
                <div className="text-white text-6xl">You are logged in !!!!</div>
                <div className="text-white text-sm text-center">Your token is {token}</div>
            </div>
        </>
    );
}

// Wrapping the component in Suspense with a fallback UI
export default function TesteWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Teste />
        </Suspense>
    );
}
