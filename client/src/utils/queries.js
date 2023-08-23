import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_CHATROOMS_SORT = gql`
  query chatroomsSort($offset: Int, $limit: Int, $searchTerm: String) {
    chatRoomsSort(offset: $offset, limit: $limit, searchTerm: $searchTerm) {
      _id
      name
    }
  }
`;

export const QUERY_CHATROOMS_SORT_COUNT = gql`
  query chatroomsSortCount($searchTerm: String) {
    chatRoomsSortCount(searchTerm: $searchTerm)
  }
`;

export const QUERY_CHATROOMS = gql`
  query chatrooms {
    chatRooms {
      _id
      name
    }
  }
`;

export const QUERY_CHATROOM = gql`
  query chatroom($id: ID!) {
    chatRoom(_id: $id) {
      _id
      name
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query messages($chatRoomId: ID!) {
    messages(chatRoomId: $chatRoomId) {
      _id
      messageText
      createdAt
      chatRoomId
      username
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
