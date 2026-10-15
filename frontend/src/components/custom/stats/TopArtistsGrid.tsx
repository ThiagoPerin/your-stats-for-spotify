"use client";
import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
import { SpotifyArtist } from "@/types/spotify-user-top-artists.types";
import { imageUrl } from "@/lib/stats";
import { SectionHeader, ShowAllToggle } from "./SectionHeader";

const COLLAPSED_COUNT = 10;

export function TopArtistsGrid({ artists }: { artists: SpotifyArtist[] }) {
    const [expanded, setExpanded] = useState(false);
    const visible = expanded ? artists : artists.slice(0, COLLAPSED_COUNT);

    return (
        <section>
            <SectionHeader
                title="Top artists"
                subtitle="The artists you listen to the most"
                action={artists.length > COLLAPSED_COUNT && (
                    <ShowAllToggle expanded={expanded} onToggle={() => setExpanded((e) => !e)} total={artists.length} />
                )}
            />
            {artists.length === 0 ? (
                <p className="rounded-lg bg-sp-surface p-6 text-sm text-sp-subdued">
                    Spotify doesn&apos;t have enough listening history to rank your artists yet.
                </p>
            ) : (
                <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {visible.map((artist, index) => {
                        const photo = imageUrl(artist.images);
                        return (
                            <li key={artist.id}>
                                <a
                                    href={artist.external_urls.spotify}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-lg p-3 transition-colors hover:bg-sp-elevated"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-full bg-sp-elevated shadow-lg">
                                        {photo ? (
                                            <Image src={photo} alt={artist.name} fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
                                        ) : (
                                            <User className="absolute inset-0 m-auto size-1/3 text-sp-subdued" />
                                        )}
                                    </div>
                                    <p className="mt-3 truncate font-bold text-sp-text">
                                        <span className="mr-1.5 text-sp-subdued tabular-nums">{index + 1}</span>
                                        {artist.name}
                                    </p>
                                    <p className="truncate text-sm text-sp-subdued capitalize">
                                        {artist.genres?.[0] ?? "Artist"}
                                    </p>
                                </a>
                            </li>
                        );
                    })}
                </ol>
            )}
        </section>
    );
}
