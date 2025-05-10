import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
    let controller: ApiController;
    const serviceMock = {
        getUserInfo: jest.fn().mockResolvedValue({ id: 'user' }),
        getUserTopArtists: jest.fn().mockResolvedValue([]),
        getUserTopTracks: jest.fn().mockResolvedValue([]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ApiController],
            providers: [{ provide: ApiService, useValue: serviceMock }],
        }).compile();

        controller = module.get<ApiController>(ApiController);
    });

    it('should return user info', async () => {
        const user = await controller.getUser('session');
        expect(user).toEqual({ id: 'user' });
    });
});
