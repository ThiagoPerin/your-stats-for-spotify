import { ApiService } from './api.service';
import Redis from 'ioredis';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiService', () => {
    let service: ApiService;
    const redisMock = {
        get: jest.fn(),
    } as unknown as Redis;

    beforeEach(() => {
        service = new ApiService(redisMock);
    });

    it('should throw if session is missing', async () => {
        redisMock.get = jest.fn().mockResolvedValue(null);
        await expect(service.getUserInfo('fake')).rejects.toThrow('Session expired or invalid');
    });

    it('should return user info', async () => {
        redisMock.get = jest.fn().mockResolvedValue(JSON.stringify({ access_token: 'abc' }));
        mockedAxios.get.mockResolvedValue({ data: { id: 'user1' } });

        const result = await service.getUserInfo('123');
        expect(result).toEqual({ id: 'user1' });
    });
});
