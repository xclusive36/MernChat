// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
  }

  # This "Message" type defines the queryable fields for every message in our data source.
  type Message {
    _id: ID
    messageText: String
    createdAt: String
    username: String
  }

  # This "ChatRoom" type defines the queryable fields for every chat room in our data source.
  type ChatRoom {
    _id: ID
    name: String
    users: [User]
    messages: [Message]
  }

  type Auth {
    token: ID!
    user: User
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  # The "user" query returns a single User (defined above).
  # The "messages" query returns an array of zero or more Messages (defined above).
  # The "message" query returns a single Message (defined above).
  # The "chatRooms" query returns an array of zero or more ChatRooms (defined above).
  # The "chatRoom" query returns a single ChatRoom (defined above).
  type Query {
    users: [User]
    user(username: String!): User
    messages: [Message]
    message(_id: ID!): Message
    chatRooms: [ChatRoom]
    chatRoom(name: String!): ChatRoom
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each. In this
  # case, the "addUser" mutation returns an Auth (defined above).
  # The "login" mutation returns an Auth (defined above).
  # The "addMessage" mutation returns a Message (defined above).
  # The "addChatRoom" mutation returns a ChatRoom (defined above).
  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addMessage(messageText: String!): Message
    addChatRoom(name: String!): ChatRoom
    removeChatRoom(name: String!): ChatRoom
    removeMessage(_id: ID!): Message
    updateChatRoom(name: String!, users: [ID], messages: [ID]): ChatRoom
    userOnline(_id: ID!): User
    userOffline(_id: ID!): User
    userJoinedChatRoom(_id: ID!, chatRoom: ID!): User
    userTypingInChatRoom(_id: ID!, chatRoom: ID!): User
    messageAddedToChatRoom(_id: ID!, chatRoom: ID!): Message
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that
  # clients can subscribe to, along with the return type for each. In this
  # case, the "messageAdded" subscription returns a Message (defined above).
  type Subscription {
    messageAdded: Message
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that
  # clients can subscribe to, along with the return type for each. In this
  # case, the "chatRoomAdded" subscription returns a ChatRoom (defined above).
  type Subscription {
    chatRoomAdded: ChatRoom
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that
  # clients can subscribe to, along with the return type for each. In this
  # case, the "chatRoomRemoved" subscription returns a ChatRoom (defined above).
  type Subscription {
    chatRoomRemoved: ChatRoom
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that
  # clients can subscribe to, along with the return type for each. In this
  # case, the "messageRemoved" subscription returns a Message (defined above).
  type Subscription {
    messageRemoved: Message
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that
  # clients can subscribe to, along with the return type for each. In this
  # case, the "chatRoomUpdated" subscription returns a ChatRoom (defined above).
  type Subscription {
    chatRoomUpdated: ChatRoom
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that clients can subscribe to, along with the return type for each. In this case, the "userOnline" subscription returns a User (defined above).
  type Subscription {
    userOnline: User
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that clients can subscribe to, along with the return type for each. In this case, the "userOffline" subscription returns a User (defined above).
  type Subscription {
    userOffline: User
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that clients can subscribe to, along with the return type for each. In this case, the "userJoinedChatRoom" subscription returns a User (defined above).
  type Subscription {
    userJoinedChatRoom: User
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that clients can subscribe to, along with the return type for each.
  type Subscription {
    userTypingInChatRoom: User
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that clients can subscribe to, along with the return type for each.
  type Subscription {
    messageAddedToChatRoom: Message
  }
`;