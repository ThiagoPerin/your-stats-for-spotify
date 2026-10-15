import { SpotifyUserProfile } from "@/types/spotify-user-info.types";
import { SpotifyUserTopArtists } from "@/types/spotify-user-top-artists.types";
import { SpotifyUserTopTracks } from "@/types/spotify-user-top-tracks.types";

export class ApiError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

async function request<T>(path: string, label: string): Promise<T> {
    const res = await fetch(path);

    if (!res.ok) {
        throw new ApiError(res.status, `Failed to fetch ${label}: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export class UserServices {
    static fetchUserProfile(sessionId: string): Promise<SpotifyUserProfile> {
        return request(`/spotify/sessions/${sessionId}/user`, "user profile");
    }

    static fetchUserTopArtists(sessionId: string, limit: number): Promise<SpotifyUserTopArtists> {
        return request(`/spotify/sessions/${sessionId}/top/artists?limit=${limit}`, "top artists");
    }

    static fetchUserTopTracks(sessionId: string, limit: number): Promise<SpotifyUserTopTracks> {
        return request(`/spotify/sessions/${sessionId}/top/tracks?limit=${limit}`, "top tracks");
    }
}
