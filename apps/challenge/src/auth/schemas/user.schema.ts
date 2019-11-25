import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

interface IUserDocument extends Document {
  username: string;
  password: string;
}

export { UserSchema, IUserDocument };
