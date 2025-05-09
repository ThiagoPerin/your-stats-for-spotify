import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('spotify/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('login')
    login(@Res() res: Response) {
        const url = this.authService.getLoginUrl();
        res.redirect(url);
    }

    @Get('callback')
    async callback(@Query('code') code: string, @Res() res: Response) {
        const sessionId = await this.authService.getTokens(code);
        return res.redirect(`/success?session_id=${sessionId}`);
    }
}
