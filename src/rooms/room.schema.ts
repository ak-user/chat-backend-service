import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    connections: [ObjectID],
    date: {
        type: Date,
        default: Date.now
    }
});
