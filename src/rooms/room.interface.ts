import { Document } from 'mongoose';
import { ObjectID } from 'bson';


export interface Room extends Document {
    readonly _id: ObjectID;
    readonly name: string;
    readonly connections: Array<ObjectID>;
    readonly date: Date;
}
