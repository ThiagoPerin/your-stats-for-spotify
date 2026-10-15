"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Block({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-lg bg-sp-elevated ${className}`} />;
}

export function StatsSkeleton() {
    return (
        <div aria-busy="true" aria-label="Loading your stats">
            <div className="colored-gradient-1 relative">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pt-10 pb-8 sm:flex-row sm:items-end sm:px-8">
                    <div className="size-36 animate-pulse rounded-full bg-white/20 sm:size-48" />
                    <div className="space-y-3">
                        <div className="h-4 w-16 animate-pulse rounded bg-white/20" />
                        <div className="h-14 w-72 animate-pulse rounded bg-white/20" />
                        <div className="h-4 w-48 animate-pulse rounded bg-white/20" />
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }, (_, i) => <Block key={i} className="h-22" />)}
                </div>
                <div className="space-y-2">
                    {Array.from({ length: 6 }, (_, i) => <Block key={i} className="h-14" />)}
                </div>
            </div>
        </div>
    );
}

type StatsErrorProps = {
    title: string;
    message: string;
};

export function StatsError({ title, message }: StatsErrorProps) {
    const router = useRouter();

    return (
        <div className="colored-gradient-1 flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center text-spotify-white">
            <Image src="/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Primary Logo" height={72} width={72} />
            <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
            <p className="max-w-md text-lg">{message}</p>
            <Button
                className="bg-spotify-green text-spotify-black hover:bg-spotify-white hover:text-spotify-black"
                onClick={() => router.push("/spotify/auth/login")}
            >
                Log in with Spotify
            </Button>
        </div>
    );
}
