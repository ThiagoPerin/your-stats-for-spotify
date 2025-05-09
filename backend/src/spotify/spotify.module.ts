import { Module } from '@nestjs/common';
import { SpotifyController } from './spotify.controller';
import { SpotifyService } from './spotify.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
    imports: [RedisModule],
    controllers: [SpotifyController],
    providers: [SpotifyService],
})
export class SpotifyModule { }
