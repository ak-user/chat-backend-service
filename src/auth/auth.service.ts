import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    private async validate(user: User): Promise<User> {
        return await this.userService.findByEmail(user.email);
    }

    async login(user: User): Promise<any | { status: number }> {
        return this.validate(user).then((user) => {
            if (!user) {
                return new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            const payload = `${user._id}`;
            const accessToken = this.jwtService.sign(payload);

            return {
                expiresIn: '60h',
                accessToken: accessToken,
                userId: payload,
                status: 200
            };

        });
    }

    async register(user: User) {
        try {
            const isNewUser = await this.userService.findByEmail(user.username);
            if (isNewUser) {
                return new HttpException('User already exist', HttpStatus.CONFLICT);
            }
            return await this.userService.create(user);
        } catch (err) {
            throw new HttpException('Server error, try later', HttpStatus.BAD_REQUEST);
        }
    }

    checkToken(token) {
        try {
            const user = this.jwtService.verify(token);
            return this.validate(user);
        } catch (err) {
            return false;
        }
    }
}
