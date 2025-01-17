import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  firstName: string;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
});
