"use client";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTopArtists, useTopTracks, useUserProfile } from "@/hooks/useSpotifyStats";
import { ApiError } from "@/services/userServices";
import { topGenres, tracksByDecade } from "@/lib/stats";
import { StatsHeader } from "@/components/custom/stats/StatsHeader";
import { ProfileHero } from "@/components/custom/stats/ProfileHero";
import { StatTiles } from "@/components/custom/stats/StatTiles";
import { TopTracksTable } from "@/components/custom/stats/TopTracksTable";
import { TopArtistsGrid } from "@/components/custom/stats/TopArtistsGrid";
import { DecadeChart, GenreChart } from "@/components/custom/stats/Charts";
import { StatsError, StatsSkeleton } from "@/components/custom/stats/StatsStates";

function StatsPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id") || "";

    const user = useUserProfile(sessionId);
    const topArtists = useTopArtists(sessionId);
    const topTracks = useTopTracks(sessionId);

    const artists = useMemo(() => topArtists.data?.items ?? [], [topArtists.data]);
    const tracks = useMemo(() => topTracks.data?.items ?? [], [topTracks.data]);
    const genres = useMemo(() => topGenres(artists), [artists]);
    const decades = useMemo(() => tracksByDecade(tracks), [tracks]);

    if (!sessionId) {
        return <StatsError title="No session found" message="Log in with your Spotify account to see your stats." />;
    }

    const error = user.error ?? topArtists.error ?? topTracks.error;
    if (error) {
        const expired = error instanceof ApiError && error.status === 401;
        return expired
            ? <StatsError title="Session expired" message="Your Spotify session has expired. Log in again to see your latest stats." />
            : <StatsError title="Something went wrong" message="We couldn't load your stats from Spotify. Please try logging in again." />;
    }

    return (
        <div className="min-h-screen bg-sp-base text-sp-text">
            <StatsHeader />
            {!user.data || topArtists.isPending || topTracks.isPending ? (
                <StatsSkeleton />
            ) : (
                <main>
                    <ProfileHero user={user.data} />
                    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-8">
                        <StatTiles artists={artists} tracks={tracks} genres={genres} />
                        <TopTracksTable tracks={tracks} />
                        <TopArtistsGrid artists={artists} />
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <GenreChart genres={genres} artistCount={artists.length} />
                            <DecadeChart decades={decades} trackCount={tracks.length} />
                        </div>
                    </div>
                    <footer className="pb-8 text-center text-sm text-sp-subdued">Developed with ❤ by Thiago Perin</footer>
                </main>
            )}
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<StatsSkeleton />}>
            <StatsPage />
        </Suspense>
    );
}
