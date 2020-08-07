import { Document } from 'mongoose';
import { ObjectID } from 'bson';


export interface User extends Document {
    readonly _id: ObjectID;
    readonly username: string;
    readonly email: string;
    readonly password: string
}
