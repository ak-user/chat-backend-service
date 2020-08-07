import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({
            email: email
        });
    }

    async findById(id: string): Promise<User> {
        return await this.userModel.findOne({
            _id: id
        });
    }

    async create(user: User): Promise<User> {
        return await this.userModel.create(user);
    }
}
