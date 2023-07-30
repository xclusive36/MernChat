import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ChatRoom",
  },
});

export const Message = model("Message", messageSchema);
