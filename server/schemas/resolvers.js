import { User, ChatRoom, Message } from "../models/index.js";
import { signToken } from "../utils/auth.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id });
    },
    messages: async (parent, { chatRoomId }) => {
      return (await Message.find({ chatRoomId: chatRoomId }));
    },
    message: async (parent, { _id }) => {
      return Message.findOne({ _id });
    },
    // chatRoomsSort: async (parent, { offset, limit, searchTerm }) => {
    chatRoomsSort: async (parent, { offset, limit, searchTerm }) => {
      const query = {};
      if (searchTerm) {
        query.name = {
          $regex: searchTerm,
          $options: "i",
        };
      }
      const chatRooms = await ChatRoom.find(query)
        .skip(offset)
        .limit(limit)
        .sort({ name: 1 });
      return chatRooms;
    },
    chatRoomsSortCount: async (parent, { searchTerm }) => {
      const query = {};
      if (searchTerm) {
        query.name = {
          $regex: searchTerm,
          $options: "i",
        };
      }
      const count = await ChatRoom.find(query).countDocuments();
      return count;
    },
    chatRooms: async (parent, args) => {
      return ChatRoom.find({});
    },
    chatRoom: async (parent, { _id }) => {
      return ChatRoom.findOne({ _id });
    },
  },
  Mutation: {
    addUser: async (
      parent,
      { firstName, lastName, username, email, password }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        online: true,
      });
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { _id }) => {
      const user = await User.findOneAndDelete({ _id });

      if (!user) {
        throw new AuthenticationError("No user found with this id!");
      }

      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addMessage: async (parent, { messageText, chatRoomId }, context) => {
      if (context.user) {
        const { username } = JSON.parse(context.user);
        
        const message = await Message.create({
          messageText,
          username: username,
          chatRoomId,
        });

        pubsub.publish("MESSAGE_CREATED", {
          messageAdded: message,
        }); // publish the message to the channel

        return message;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addChatRoom: async (parent, { name }, context) => {
      if (context.user) {
        return ChatRoom.create({
          name,
        });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeChatRoom: async (parent, { _id }, context) => {
      if (context.user) {
        return ChatRoom.findOneAndDelete({
          _id,
        });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeAllChatRooms: async (parent, args, context) => {
      if (context.user) {
        return ChatRoom.deleteMany({});
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeMessage: async (parent, { _id }, context) => {
      if (context.user) {
        return Message.findOneAndDelete({
          _id,
        });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeAllMessages: async (parent, { chatRoomId }, context) => {
      if (context.user) {
        return Message.deleteMany({
          chatRoomId,
        });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateChatRoom: async (parent, { _id, name }, context) => {
      if (context.user) {
        return ChatRoom.findOneAndUpdate({ _id }, { name }, { new: true });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    userOnline: async (parent, { username }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { username },
          { online: true },
          { new: true }
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    userOffline: async (parent, { username }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { username },
          { online: false },
          { new: true }
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(["MESSAGE_CREATED"]),
    },
  },
};
