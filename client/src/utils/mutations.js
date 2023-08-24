import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_CHATROOM = gql`
  mutation addChatRoom($name: String!) {
    addChatRoom(name: $name) {
      _id
      name
    }
  }
`;

export const REMOVE_CHATROOM = gql`
  mutation removeChatRoom($id: ID!) {
    removeChatRoom(_id: $id) {
      _id
      name
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($messageText: String!, $chatRoomId: ID!) {
    addMessage(messageText: $messageText, chatRoomId: $chatRoomId) {
      _id
      messageText
      createdAt
      chatRoomId
      username
    }
  }
`;

export const REMOVE_MESSAGE = gql`
  mutation removeMessage($id: ID!) {
    removeMessage(_id: $id) {
      _id
      messageText
      createdAt
      chatRoomId
      username
    }
  }
`;

export const REMOVE_ALL_MESSAGES = gql`
  mutation removeAllMessages($chatRoomId: ID!) {
    removeAllMessages(chatRoomId: $chatRoomId) {
      _id
      messageText
      createdAt
      chatRoomId
      username
    }
  }
`;
