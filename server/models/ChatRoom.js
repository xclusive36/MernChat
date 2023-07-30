import { Schema, model } from "mongoose";

const chatRoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const ChatRoom = model("ChatRoom", chatRoomSchema);
