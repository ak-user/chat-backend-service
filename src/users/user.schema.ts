import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});
