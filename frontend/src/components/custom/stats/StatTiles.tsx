import Image from "next/image";
import { ReactNode } from "react";
import { SpotifyArtist } from "@/types/spotify-user-top-artists.types";
import { SpotifyTrack } from "@/types/spotify-user-top-tracks.types";
import { averagePopularity, CountItem, imageUrl } from "@/lib/stats";

type TileProps = {
    label: string;
    value: string;
    detail?: string;
    image?: string;
    roundImage?: boolean;
    children?: ReactNode;
};

function Tile({ label, value, detail, image, roundImage, children }: TileProps) {
    return (
        <div className="flex min-w-0 items-center gap-4 rounded-lg bg-sp-surface p-4">
            {image && (
                <div className={`relative size-14 shrink-0 overflow-hidden bg-sp-highlight ${roundImage ? "rounded-full" : "rounded"}`}>
                    <Image src={image} alt="" fill sizes="56px" className="object-cover" />
                </div>
            )}
            <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold tracking-wide text-sp-subdued uppercase">{label}</p>
                <p className="truncate text-xl font-bold text-sp-text capitalize" title={value}>{value}</p>
                {detail && <p className="truncate text-sm text-sp-subdued">{detail}</p>}
                {children}
            </div>
        </div>
    );
}

type StatTilesProps = {
    artists: SpotifyArtist[];
    tracks: SpotifyTrack[];
    genres: CountItem[];
};

export function StatTiles({ artists, tracks, genres }: StatTilesProps) {
    const topArtist = artists[0];
    const topTrack = tracks[0];
    const topGenre = genres[0];
    const mainstream = averagePopularity(tracks);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile
                label="Top artist"
                value={topArtist?.name ?? "—"}
                detail={topArtist?.genres?.[0] ?? "Your #1 artist"}
                image={imageUrl(topArtist?.images)}
                roundImage
            />
            <Tile
                label="Top track"
                value={topTrack?.name ?? "—"}
                detail={topTrack?.artists.map((a) => a.name).join(", ")}
                image={imageUrl(topTrack?.album.images)}
            />
            <Tile
                label="Top genre"
                value={topGenre?.label ?? "—"}
                detail={topGenre ? `${topGenre.count} of your top ${artists.length} artists` : "No genre data from Spotify"}
            />
            <Tile
                label="Mainstream score"
                value={mainstream === null ? "—" : `${mainstream} / 100`}
                detail={mainstream === null ? "No popularity data from Spotify" : "Avg. popularity of your top tracks"}
            >
                {mainstream !== null && (
                    <div className="mt-2 h-1 rounded-full bg-sp-track" aria-hidden>
                        <div className="h-1 rounded-full bg-sp-chart" style={{ width: `${mainstream}%` }} />
                    </div>
                )}
            </Tile>
        </div>
    );
}
