"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <>
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <Button className="bg-[#81b71a]" onClick={() => router.push("/spotify/login")}>Start This Adventure</Button>
      </div>
    </>
  );
}
