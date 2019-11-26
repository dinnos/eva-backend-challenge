import { Schema, Document } from 'mongoose';

enum ROLE_TYPES {
  CUSTOMER_CARE = 'CUSTOMER_CARE',
  GROWTH = 'GROWTH',
  SCIENCE_DATA = 'SCIENCE_DATA',
}

interface IUserDocument extends Document {
  username: string;
  password: string;
  roles: ROLE_TYPES[];
}

const UserSchema = new Schema(({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: Object.keys(ROLE_TYPES) }],
}));

export { IUserDocument, UserSchema, ROLE_TYPES };
