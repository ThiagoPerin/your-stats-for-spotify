import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('spotify')
export class ApiController {
    constructor(private readonly apiService: ApiService) { }

    @Get('sessions/:sessionId/user')
    async getUser(@Param('sessionId') sessionId: string) {
        return this.apiService.getUserInfo(sessionId);
    }

    @Get('sessions/:sessionId/top/artists')
    async getUserTopArtists(
        @Param('sessionId') sessionId: string,
        @Query('limit') limit: number = 10,
    ) {
        return this.apiService.getUserTopArtists(sessionId, limit);
    }

    @Get('sessions/:sessionId/top/tracks')
    async getUserTopTracks(
        @Param('sessionId') sessionId: string,
        @Query('limit') limit: number = 10,
    ) {
        return this.apiService.getUserTopTracks(sessionId, limit);
    }
}
