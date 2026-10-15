import { SpotifyArtist } from "@/types/spotify-user-top-artists.types";
import { SpotifyTrack } from "@/types/spotify-user-top-tracks.types";

export type CountItem = { label: string; count: number };

type SpotifyImage = { url: string; height: number; width: number };

// Spotify returns images largest first
export function imageUrl(images: SpotifyImage[] | undefined): string | undefined {
    return images?.[0]?.url;
}

export function topGenres(artists: SpotifyArtist[], max = 8): CountItem[] {
    const counts = new Map<string, number>();
    for (const artist of artists) {
        for (const genre of artist.genres ?? []) {
            counts.set(genre, (counts.get(genre) ?? 0) + 1);
        }
    }

    return [...counts.entries()]
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
        .slice(0, max);
}

// Gaps are filled with zeros so the time axis stays continuous
export function tracksByDecade(tracks: SpotifyTrack[]): CountItem[] {
    const counts = new Map<number, number>();
    for (const track of tracks) {
        const year = parseInt(track.album?.release_date?.slice(0, 4) ?? "", 10);
        if (Number.isNaN(year)) continue;
        const decade = Math.floor(year / 10) * 10;
        counts.set(decade, (counts.get(decade) ?? 0) + 1);
    }
    if (counts.size === 0) return [];

    const decades = [...counts.keys()];
    const items: CountItem[] = [];
    for (let d = Math.min(...decades); d <= Math.max(...decades); d += 10) {
        items.push({ label: `${d}s`, count: counts.get(d) ?? 0 });
    }
    return items;
}

// Popularity can be missing for some apps/regions, so only average what exists
export function averagePopularity(items: { popularity?: number }[]): number | null {
    const values = items.map((i) => i.popularity).filter((p): p is number => typeof p === "number");
    if (values.length === 0) return null;
    return Math.round(values.reduce((sum, p) => sum + p, 0) / values.length);
}

export function formatDuration(ms: number): string {
    const totalSeconds = Math.round(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatNumber(value: number): string {
    return value.toLocaleString("en-US");
}

export function percent(part: number, total: number): number {
    return total === 0 ? 0 : Math.round((part / total) * 100);
}
