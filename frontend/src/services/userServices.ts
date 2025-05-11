import { SpotifyUserProfile } from "@/types/spotify-user-info.types";

export class UserServices {
    static async fetchUserProfile(sessionId: string): Promise<SpotifyUserProfile | null> {
        try {
            const response = await fetch(`/spotify/sessions/${sessionId}/user`);

            if (!response.ok) {
                throw new Error(`Erro ao buscar usuário: ${response.status} ${response.statusText}`);
            }

            const data: SpotifyUserProfile = await response.json();
            return data;
        } catch (error) {
            console.error('Erro em fetchUserProfile:', error);
            return null;
        }
    }
}