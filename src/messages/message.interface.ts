import { Document } from 'mongoose';
import { ObjectID } from 'bson';


export interface Message extends Document {
    readonly _id: ObjectID;
    readonly userId: ObjectID;
    readonly roomId: ObjectID;
    readonly text: string;
    readonly created: Date;
}
