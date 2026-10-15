"use client";
import Image from "next/image";
import { useState } from "react";
import { Clock3, Music } from "lucide-react";
import { SpotifyTrack } from "@/types/spotify-user-top-tracks.types";
import { formatDuration, imageUrl } from "@/lib/stats";
import { SectionHeader, ShowAllToggle } from "./SectionHeader";

const COLLAPSED_COUNT = 10;

function PopularityMeter({ value }: { value?: number }) {
    if (typeof value !== "number") return <span className="text-sp-subdued">—</span>;
    return (
        <div className="flex items-center gap-2" title={`Popularity ${value} / 100`}>
            <div className="h-1 w-20 rounded-full bg-sp-track" aria-hidden>
                <div className="h-1 rounded-full bg-sp-chart" style={{ width: `${value}%` }} />
            </div>
            <span className="w-6 text-right text-sp-subdued tabular-nums">{value}</span>
        </div>
    );
}

export function TopTracksTable({ tracks }: { tracks: SpotifyTrack[] }) {
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? tracks : tracks.slice(0, COLLAPSED_COUNT);

    return (
        <section>
            <SectionHeader
                title="Top tracks"
                subtitle="The songs you've had on repeat lately"
                action={tracks.length > COLLAPSED_COUNT && (
                    <ShowAllToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} total={tracks.length} />
                )}
            />
            {tracks.length === 0 ? (
                <p className="rounded-lg bg-sp-surface p-6 text-sm text-sp-subdued">
                    Spotify doesn&apos;t have enough listening history to rank your tracks yet.
                </p>
            ) : (
                <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
                    <thead>
                        <tr className="text-left text-sp-subdued">
                            <th className="w-10 border-b border-sp-highlight px-2 py-2 text-right font-normal">#</th>
                            <th className="border-b border-sp-highlight px-3 py-2 font-normal">Title</th>
                            <th className="hidden border-b border-sp-highlight px-3 py-2 font-normal md:table-cell">Album</th>
                            <th className="hidden w-36 border-b border-sp-highlight px-3 py-2 font-normal lg:table-cell">Popularity</th>
                            <th className="w-16 border-b border-sp-highlight px-3 py-2 text-right font-normal">
                                <Clock3 className="ml-auto size-4" aria-label="Duration" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((track, index) => {
                            const cover = imageUrl(track.album.images);
                            return (
                                <tr key={track.id} className="group text-sp-subdued hover:bg-sp-highlight">
                                    <td className="rounded-l-md px-2 py-2 text-right tabular-nums">{index + 1}</td>
                                    <td className="px-3 py-2">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="relative size-10 shrink-0 overflow-hidden rounded bg-sp-elevated">
                                                {cover ? (
                                                    <Image src={cover} alt="" fill sizes="40px" className="object-cover" />
                                                ) : (
                                                    <Music className="absolute inset-0 m-auto size-4" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <a
                                                    href={track.external_urls.spotify}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="block truncate text-base font-medium text-sp-text hover:underline"
                                                >
                                                    {track.name}
                                                </a>
                                                <div className="flex min-w-0 items-center gap-1.5">
                                                    {track.explicit && (
                                                        <span
                                                            className="shrink-0 rounded-sm bg-sp-subdued px-1 text-[10px] leading-4 font-bold text-sp-base"
                                                            title="Explicit"
                                                        >
                                                            E
                                                        </span>
                                                    )}
                                                    <span className="truncate">
                                                        {track.artists.map((a) => a.name).join(", ")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden px-3 py-2 md:table-cell">
                                        <a
                                            href={track.album.external_urls.spotify}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block truncate group-hover:text-sp-text hover:underline"
                                        >
                                            {track.album.name}
                                        </a>
                                    </td>
                                    <td className="hidden px-3 py-2 lg:table-cell">
                                        <PopularityMeter value={track.popularity} />
                                    </td>
                                    <td className="rounded-r-md px-3 py-2 text-right tabular-nums">
                                        {formatDuration(track.duration_ms)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </section>
    );
}
