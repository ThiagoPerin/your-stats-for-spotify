import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [RedisModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
