import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TokenResponseDto } from './dto/token-response.dto';
import * as qs from 'qs';

@Injectable()
export class SpotifyService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor(private readonly configService: ConfigService) {
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

    async getTokens(code: string): Promise<TokenResponseDto> {
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
                        'Basic ' +
                        Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
                },
            },
        );

        return response.data;
    }
}
