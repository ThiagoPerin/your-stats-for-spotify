import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

jest.mock('axios');
jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthService', () => {
    let service: AuthService;
    const configMock = {
        get: jest.fn((key) => {
            const map = {
                SPOTIFY_CLIENT_ID: 'cid',
                SPOTIFY_CLIENT_SECRET: 'secret',
                SPOTIFY_REDIRECT_URI: 'uri',
            };
            return map[key];
        }),
    } as unknown as ConfigService;

    const redisMock = {
        setex: jest.fn(),
    } as unknown as Redis;

    beforeEach(() => {
        service = new AuthService(configMock, redisMock);
    });

    it('should return login URL', () => {
        const url = service.getLoginUrl();
        expect(url).toContain('https://accounts.spotify.com/authorize');
    });

    it('should get and save tokens', async () => {
        mockedAxios.post.mockResolvedValue({ data: { access_token: 'x', expires_in: 3600 } });
        const mockedUuidV4 = uuidv4 as jest.Mock;
        mockedUuidV4.mockReturnValue('uuid');

        const sessionId = await service.getTokens('code');
        expect(redisMock.setex).toHaveBeenCalledWith('spotify:uuid', 3600, JSON.stringify({ access_token: 'x', expires_in: 3600 }));
        expect(sessionId).toBe('uuid');
    });
});
