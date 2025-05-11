import { SpotifyUserProfile } from "@/types/spotify-user-info.types";
import { SpotifyUserTopArtists } from "@/types/spotify-user-top-artists.types";
import { SpotifyUserTopTracks } from "@/types/spotify-user-top-tracks.types";

export class UserServices {
    static async fetchUserProfile(sessionId: string): Promise<SpotifyUserProfile | null> {
        try {
            const res = await fetch(`/spotify/sessions/${sessionId}/user`);

            if (!res.ok) {
                throw new Error(`Failed to fetch user profile: ${res.status} ${res.statusText}`);
            }

            const data: SpotifyUserProfile = await res.json();
            return data;
        } catch (error) {
            console.error('Error in fetchUserProfile:', error);
            return null;
        }
    }

    static async fetchUserTopArtists(sessionId: string, limit: number): Promise<SpotifyUserTopArtists | null> {
        try {
            const res = await fetch(`/spotify/sessions/${sessionId}/top/artists?limit=${limit}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch top artists: ${res.status} ${res.statusText}`);
            }

            const data: SpotifyUserTopArtists = await res.json();
            return data;
        } catch (error) {
            console.error('Error in fetchUserTopArtists:', error);
            return null;
        }
    }

    static async fetchUserTopTracks(sessionId: string, limit: number): Promise<SpotifyUserTopTracks | null> {
        try {
            const res = await fetch(`/spotify/sessions/${sessionId}/top/tracks?limit=${limit}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch top tracks: ${res.status} ${res.statusText}`);
            }

            const data: SpotifyUserTopTracks = await res.json();
            return data;
        } catch (error) {
            console.error('Error in fetchUserTopArtists:', error);
            return null;
        }
    }
}