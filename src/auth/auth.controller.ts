import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.interface';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() user: User): Promise<any> {
        try {
            return this.authService.login(user);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException('Server error', HttpStatus.FORBIDDEN);
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() user: User): Promise<any> {
        try {
            return this.authService.register(user);
        } catch (err) {
            if (err instanceof HttpException) {
                throw err;
            } else {
                throw new HttpException('Server error', HttpStatus.FORBIDDEN);
            }
        }
    }
}
