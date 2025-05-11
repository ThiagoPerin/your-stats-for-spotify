import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SpotifyUserProfile } from 'src/types/spotify-user-info.types';
import { SpotifyUserTopArtists } from 'src/types/spotify-user-top-artists.types';
import { SpotifyUserTopTracks } from 'src/types/spotify-user-top-tracks.types';
import axios from 'axios';
import Redis from 'ioredis';

@Injectable()
export class ApiService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    ) { }

    async getUserInfo(sessionId: string): Promise<SpotifyUserProfile> {
        const sessionData = await this.redisClient.get(`spotify:${sessionId}`);
        if (!sessionData) throw new UnauthorizedException('Session expired or invalid');
        const { access_token } = JSON.parse(sessionData);
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }

    async getUserTopArtists(sessionId: string, limit: number): Promise<SpotifyUserTopArtists> {
        const sessionData = await this.redisClient.get(`spotify:${sessionId}`);
        if (!sessionData) throw new UnauthorizedException('Session expired or invalid');
        const { access_token } = JSON.parse(sessionData);
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params: {
                limit: limit,
            },
        });
        return response.data;
    }

    async getUserTopTracks(sessionId: string, limit: number): Promise<SpotifyUserTopTracks> {
        const sessionData = await this.redisClient.get(`spotify:${sessionId}`);
        if (!sessionData) throw new UnauthorizedException('Session expired or invalid');
        const { access_token } = JSON.parse(sessionData);
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params: {
                limit: limit,
            },
        });
        return response.data;
    }
}
