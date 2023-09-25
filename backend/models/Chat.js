import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("chats", chatSchema);
