"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SpotifyUserProfile } from "@/types/spotify-user-info.types";
import { UserServices } from "@/services/userServices";
import { SpotifyUserTopArtists } from "@/types/spotify-user-top-artists.types";
import { SpotifyUserTopTracks } from "@/types/spotify-user-top-tracks.types";

function Teste() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id") || "";
    const [userData, setUserData] = useState<SpotifyUserProfile | null>(null);
    const [userTopArtists, setUserTopArtists] = useState<SpotifyUserTopArtists | null>(null);
    const [userTopTracks, setUserTopTracks] = useState<SpotifyUserTopTracks | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await UserServices.fetchUserProfile(session_id);
            setUserData(data);
        };
        const fetchUserTopArtists = async () => {
            const data = await UserServices.fetchUserTopArtists(session_id, 1);
            setUserTopArtists(data);
        };
        const fetchUserTopTracks = async () => {
            const data = await UserServices.fetchUserTopTracks(session_id, 1);
            setUserTopTracks(data);
        };

        if (session_id) {
            fetchUserProfile();
            fetchUserTopArtists();
            fetchUserTopTracks();
        }
    }, [session_id]);


    return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
            <div className="text-white text-6xl">You are logged in !!!!</div>
            <div className="text-white text-sm text-center">Your session_id is {session_id}</div>
            {userData ? (
                <div className="text-white text-center mt-4">
                    {JSON.stringify(userData)}
                </div>
            ) : (
                <div className="text-white text-center mt-4">Failed to load user data</div>
            )}
            {userTopArtists ? (
                <div className="text-white text-center mt-4">
                    {JSON.stringify(userTopArtists)}
                </div>
            ) : (
                <div className="text-white text-center mt-4">Failed to load user data</div>
            )}
            {userTopTracks ? (
                <div className="text-white text-center mt-4">
                    {JSON.stringify(userTopTracks)}
                </div>
            ) : (
                <div className="text-white text-center mt-4">Failed to load user data</div>
            )}
        </div>
    );
}

export default function TesteWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Teste />
        </Suspense>
    );
}
