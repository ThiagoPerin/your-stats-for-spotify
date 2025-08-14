"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SpotifyUserProfile } from "@/types/spotify-user-info.types";
import { UserServices } from "@/services/userServices";
import { SpotifyUserTopArtists } from "@/types/spotify-user-top-artists.types";
import Image from "next/image";
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
        <div className="w-screen h-screen colored-gradient-1 flex flex-col items-center gap-2">
            <div className="h-fit w-full flex items-center justify-between p-2 bg-translucent-black">
                {userData &&
                    <>
                        <div className="text-white text-xl">{userData.display_name}</div>
                        <Image src={userData.images[0].url} alt="Spotify Primary Logo" height={60} width={60} className="rounded-full" />
                    </>
                }
            </div>
            <div className="w-full flex gap-2 p-2">
                <div className="text-white text-xl bg-translucent-black p-2 rounded-2xl">
                    <div className="text-black">Top Artists</div>
                    <ul>
                        {userTopArtists &&
                            userTopArtists.items.map((artist) => (
                                <li key={artist.id}>{artist.name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="text-white text-xl bg-translucent-black p-2 rounded-2xl">
                    <div className="text-black">Top Tracks</div>
                    <ul>
                        {userTopTracks &&
                            userTopTracks.items.map((track) => (
                                <li key={track.id}>{track.name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
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
