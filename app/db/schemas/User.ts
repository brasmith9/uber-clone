import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  homeLocation?: string;
  workLocation?: string;
  isVerified?: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  phone: { type: String },
  avatar: { type: String },
  homeLocation: { type: String },
  workLocation: { type: String },
  isVerified: { type: Boolean, default: false },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

export default User;
