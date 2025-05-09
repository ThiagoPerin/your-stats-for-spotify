import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { Response } from 'express';

@Controller('spotify')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) { }

    @Get('login')
    login(@Res() res: Response) {
        const url = this.spotifyService.getLoginUrl();
        res.redirect(url);
    }

    @Get('callback')
    async callback(@Query('code') code: string, @Res() res: Response) {
        const sessionId = await this.spotifyService.getTokens(code);
        return res.redirect(`/success?session_id=${sessionId}`);
    }

    @Get('user/:sessionId')
    async getUser(@Param('sessionId') sessionId: string) {
        return this.spotifyService.getUserInfo(sessionId);
    }
}
