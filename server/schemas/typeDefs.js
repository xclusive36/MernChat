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
    online: Boolean
  }

  # This "ChatRoom" type defines the queryable fields for every chat room in our data source.
  type ChatRoom {
    _id: ID
    name: String
    users: [User]
  }

  # This "Message" type defines the queryable fields for every message in our data source.
  type Message {
    _id: ID
    messageText: String
    createdAt: String
    username: String
    chatRoom: [ChatRoom]
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
    user(_id: ID!): User
    messages(chatRoom: ID!): [Message]
    message(_id: ID!): Message
    chatRooms: [ChatRoom]
    chatRoom(_id: ID!): ChatRoom
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each. In this
  # case, the "addUser" mutation returns an Auth (defined above).
  # The "login" mutation returns an Auth (defined above).
  # The "addMessage" mutation returns a Message (defined above).
  # The "addChatRoom" mutation returns a ChatRoom (defined above).
  # The "removeChatRoom" mutation returns a ChatRoom (defined above).
  # The "removeMessage" mutation returns a Message (defined above).
  # The "updateChatRoom" mutation returns a ChatRoom (defined above).
  # The "userOnline" mutation returns a User (defined above).
  # The "userOffline" mutation returns a User (defined above).
  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    removeUser(_id: ID!): User
    login(email: String!, password: String!): Auth
    addMessage(messageText: String!, chatRoom: ID!): Message
    addChatRoom(name: String!): ChatRoom
    removeChatRoom(_id: ID!): ChatRoom
    removeMessage(_id: ID!): Message
    updateChatRoom(name: String!, users: [ID]): ChatRoom
    userOnline(_id: ID!): User
    userOffline(_id: ID!): User
  }
`;
