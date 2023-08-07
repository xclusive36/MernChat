import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CHATROOM } from "../utils/queries";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Chat = () => {
  // Use `useParams()` to retrieve value of the route parameter `:chatRoomId`
  const { chatRoomId } = useParams();

  // check and sanitize the chatRoomId route param value
  const sanitizedChatRoomId = chatRoomId.replace(/[^a-zA-Z0-9]/g, "");

  // Use `useQuery()` hook to retrieve chatRoom data
  const { loading, data } = useQuery(QUERY_CHATROOM, {
    variables: { id: sanitizedChatRoomId },
  });

  const chatRoom = data?.chatRoom || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-row justify-center mx-4">
        <nav className=" px-4 breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li className="is-active">
              <a href={`/chat/${sanitizedChatRoomId}`} aria-current="page">
                Chat
              </a>
            </li>
          </ul>
        </nav>
        <div className="chatroom-name">Chat room: {chatRoom?.name}</div>
      </main>
    </>
  );
};

export default Chat;
