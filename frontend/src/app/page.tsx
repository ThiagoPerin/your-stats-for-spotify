"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <>
      <div className="w-screen h-screen bg-spotify-black flex flex-col items-center justify-center gap-10">
        <img src="./Spotify_Primary_Logo_RGB_Green.png" alt="Spotify Logo"  className="h-32"/>
        <h1 className="text-8xl font-bold text-spotify-white">Your Stats for Spotify</h1>
        <Button className="bg-spotify-green text-spotify-black" onClick={() => router.push("/spotify/auth/login")}>Start This Adventure</Button>
      </div>
    </>
  );
}
 