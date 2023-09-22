import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const authSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("auth", authSchema);
