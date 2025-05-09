import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as qs from 'qs';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor(
        private readonly configService: ConfigService,
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    ) {
        this.clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID') as string;
        this.clientSecret = this.configService.get<string>('SPOTIFY_CLIENT_SECRET') as string;
        this.redirectUri = this.configService.get<string>('SPOTIFY_REDIRECT_URI') as string;
    }

    getLoginUrl(): string {
        const scope = 'user-read-private user-read-email';
        return (
            'https://accounts.spotify.com/authorize?' +
            new URLSearchParams({
                response_type: 'code',
                client_id: this.clientId,
                scope,
                redirect_uri: this.redirectUri,
            })
        );
    }

    async getTokens(code: string): Promise<string> {
        const body = qs.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.redirectUri,
        });

        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:
                        'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
                },
            },
        );

        const tokens = response.data;
        const sessionId = uuidv4();

        await this.redisClient.setex(`spotify:${sessionId}`, tokens.expires_in, JSON.stringify(tokens));

        return sessionId;
    }
}
