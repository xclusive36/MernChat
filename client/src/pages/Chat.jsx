import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CHATROOM, QUERY_MESSAGES } from "../utils/queries";
import { dateFormat } from "../utils/dateFormat.js";

import Header from "../components/Header";
import AddMessage from "../components/AddMessage";
import Auth from "../utils/auth";
import RemoveAllMessages from "../components/RemoveAllMessages";
const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

const Chat = () => {
  // Use `useParams()` to retrieve value of the route parameter `:chatRoomId`
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]); // define messages state variable as [messages, setMessages]
  const subTitle = useRef();
  const subList = useRef();
  const containerEl = useRef(null);

  // Use `useQuery()` hook to retrieve chatRoom data
  const { loading, data } = useQuery(QUERY_CHATROOM, {
    variables: { id: chatRoomId },
  });

  const { data: messageData } = useQuery(QUERY_MESSAGES, {
    variables: { chatRoomId },
  });

  useEffect(() => {
    if (token && messageData) setMessages(messageData.messages);
  }, [messageData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const scrollToTop = () => {
    // scroll to top of page
    subTitle.current.scrollIntoView({
      // scroll page to the location where the element with ref={subTitle} is located
      behavior: "smooth", // set scroll behavior to smooth
      block: "center", // set scroll block to center
    });
  };

  const scrollToBottom = () => {
    // scroll to bottom of page
    subList.current.scrollIntoView({
      // scroll page to the location where the element with ref={subList} is located
      behavior: "smooth", // set scroll behavior to smooth
      block: "center", // set scroll block to center
    });
  };

  return (
    <div ref={containerEl}>
      <Header />
      <main className="container mx-4">
        <h2 ref={subTitle} className="subtitle">
          {data?.chatRoom.name}
        </h2>
        <RemoveAllMessages chatRoomId={chatRoomId} />
        {messages.map((message) => (
          <section className="p-4" key={message._id}>
            <strong>{message?.username}</strong>{" "}
            <span className="is-size-7">
              {dateFormat(message.createdAt, "dateAndTime")}
            </span>
            <div
              className={
                Auth.getProfile().data.username === message.username
                  ? "notification is-info"
                  : "notification is-light"
              }
            >
              {message.messageText}
            </div>
          </section>
        ))}
      </main>
      <AddMessage
        subTitle={subTitle}
        chatRoomId={chatRoomId}
        messages={messages}
        setMessages={setMessages}
        scrollToTop={scrollToTop}
        scrollToBottom={scrollToBottom}
      />
      <div className="subList" ref={subList} />
    </div>
  );
};

export default Chat;
