import { Schema } from "mongoose";

const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamp: true, //it add createdAt and updatedAt fields automatically
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export default userSchema;
