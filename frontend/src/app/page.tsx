"use client"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter()

  return (
    <div className="w-screen h-screen flex flex-col justify-start colored-gradient-1">
      <div className="h-fit w-full bg-spotify-black relative p-2">
        <Image src="./Spotify_Full_Logo_RGB_White.png" alt="Spotify Full Logo" height={100} width={100} />
      </div>

      <div className="h-full w-full flex flex-col items-center justify-center gap-10 p-2">
        <Image src="./Spotify_Primary_Logo_RGB_White.png" alt="Spotify Primary Logo" height={128} width={128} />
        <h1 className="sm:text-8xl text-6xl font-bold text-spotify-white text-center">Your Stats for Spotify</h1>
        <Button className="hover:bg-spotify-white hover:text-spotify-black bg-spotify-green text-spotify-white" onClick={() => router.push("/spotify/auth/login")}>Start This Adventure</Button>
      </div>

      <div className="h-fit w-full bg-spotify-black text-center p-2">
        <p className="text-spotify-white">Developed with ❤ by <span className="text-spotify-green">Thiago Perin</span></p>
      </div>
    </div>
  );
}
