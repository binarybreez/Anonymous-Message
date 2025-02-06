import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  _id: mongoose.Types.ObjectId
  content: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  verificationCode: string;
  verificationCodeExpiry: Date;
  message: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  verificationCode: {
    type: String,
    required: [true, "verification code is required"],
  },
  verificationCodeExpiry: {
    type: Date,
    required: [true, "verify code expire date is required."],
  },
  message: [messageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
export default UserModel;
