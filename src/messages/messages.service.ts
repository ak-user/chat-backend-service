import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.interface';
import { ObjectID } from 'bson';

@Injectable()
export class MessagesService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

    async create(message: Message) {
        return await this.messageModel.create(message);
    }

    async findAllMessages(roomId: ObjectID): Promise<Array<Message>> {
        return await this.messageModel.find({ roomId: roomId }).exec();
    }
}
