import { Schema, model } from "mongoose";

import { dateFormat } from "../utils/dateFormat.js";

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
  chatRoomId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ChatRoom",
  },
  username: {
    type: String,
    required: true,
  },
});

export const Message = model("Message", messageSchema);
