import * as mongoose from 'mongoose';
import { ObjectID } from 'bson';

export const MessageSchema = new mongoose.Schema({
    userId: ObjectID,
    roomId: ObjectID,
    text: String,
    created: Date
});
