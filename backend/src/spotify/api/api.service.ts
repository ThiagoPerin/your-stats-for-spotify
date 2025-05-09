import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import Redis from 'ioredis';

@Injectable()
export class ApiService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    ) { }

    async getUserInfo(sessionId: string): Promise<any> {
        const data = await this.redisClient.get(`spotify:${sessionId}`);
        if (!data) throw new UnauthorizedException('Session expired or invalid');
        const { access_token } = JSON.parse(data);
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    }
}
