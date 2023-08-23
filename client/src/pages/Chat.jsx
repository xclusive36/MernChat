import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useQuery,
  // useMutation
} from "@apollo/client";
import { QUERY_CHATROOM, QUERY_MESSAGES } from "../utils/queries";
// import { REMOVE_MESSAGE } from "../utils/mutations";
import { dateFormat } from "../utils/dateFormat.js";

import Header from "../components/Header";
import AddMessage from "../components/AddMessage";
import Auth from "../utils/auth";

const Chat = () => {
  // Use `useParams()` to retrieve value of the route parameter `:chatRoomId`
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]); // define messages state variable as [messages, setMessages]
  const subTitle = useRef();

  // Use `useQuery()` hook to retrieve chatRoom data
  const { loading, data } = useQuery(QUERY_CHATROOM, {
    variables: { id: chatRoomId },
  });

  const { data: messageData } = useQuery(QUERY_MESSAGES, {
    variables: { chatRoomId },
  });

  useEffect(() => {
    if (messageData) setMessages(messageData.messages);
  }, [messageData]);

  // const [removeMessage] = useMutation(REMOVE_MESSAGE);

  // const handleRemoveMessage = async (e, messageId) => {
  //   e.preventDefault();

  //   try {
  //     await removeMessage({
  //       variables: { id: messageId },
  //       context: {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("id_token")}`,
  //         },
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  const scrollToTop = () => {
    subTitle.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-4">
        <h2 ref={subTitle} className="subtitle">{data?.chatRoom.name}</h2>
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
            {/* <button
              className="button is-small is-danger is-light"
              onClick={(e) => handleRemoveMessage(e, message._id)}
            >
              Delete
            </button> */}
          </section>
        ))}
      </main>
      <AddMessage
        subTitle={subTitle}
        chatRoomId={chatRoomId}
        messages={messages}
        setMessages={setMessages}
        scrollToTop={scrollToTop}
      />
    </>
  );
};

export default Chat;
