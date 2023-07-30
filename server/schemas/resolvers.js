import { User } from "../models/index.js";

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
    messages: async (parent, args) => {
      return Message.find({});
    },
    message: async (parent, { _id }) => {
      return Message.findOne({ _id });
    },
    chatRooms: async (parent, args) => {
      return ChatRoom.find({});
    },
    chatRoom: async (parent, { _id }) => {
      return ChatRoom.findOne({ _id });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
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
    addMessage: async (parent, { messageText, chatRoom }, context) => {
      if (context.user) {
        return Message.create({
          messageText,
          chatRoom,
          username: context.user.username,
        });
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addChatRoom: async (parent, { name }, context) => {
      if (context.user) {
        return ChatRoom.create({
          name,
          users: [context.user.username],
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
    removeMessage: async (parent, { _id }, context) => {
      if (context.user) {
        return Message.findOneAndDelete({
          _id,
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
};
