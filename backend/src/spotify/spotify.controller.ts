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
        const tokens = await this.spotifyService.getTokens(code);
        return res.redirect(`/success?access_token=${tokens.access_token}`);
    }

    @Get('user/:token')
    async getUser(
        @Param('token') token: string,
    ) {
        console.log("chamaro no token: " + token)
        return this.spotifyService.getUserInfo(token);
    }
}
