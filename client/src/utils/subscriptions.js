import { gql } from "@apollo/client";

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded($chatRoomId: ID!) {
    messageAdded(chatRoomId: $chatRoomId) {
      _id
      messageText
      createdAt
      chatRoomId
      username
    }
  }
`;

export const CHATROOMS_SUBSCRIPTION = gql`
  subscription OnChatRoomAdded {
    chatRoomAdded {
      _id
      name
    }
  }
`;
