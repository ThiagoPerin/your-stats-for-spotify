import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('spotify')
export class ApiController {
    constructor(private readonly apiService: ApiService) { }
 
    @Get('user/:sessionId')
    async getUser(@Param('sessionId') sessionId: string) {
        return this.apiService.getUserInfo(sessionId);
    }
}
