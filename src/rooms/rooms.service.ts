import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.interface';
import { ObjectID } from 'bson';

@Injectable()
export class RoomsService {
    constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

    async findById(id: string) {
        return this.roomModel.findById(id);
    }

    async findAllRooms(userId: ObjectID): Promise<Room[]> {
        return await this.roomModel.find({ connections: userId }).lean().exec();
    }

    async create(room: Room) {
        return await this.roomModel.create(room);
    }

    async addUser(roomId: ObjectID, userId: ObjectID) {
        return await this.roomModel.update(
            { _id: roomId },
            { $push: { "connections" : userId } }
        )
    }
}
