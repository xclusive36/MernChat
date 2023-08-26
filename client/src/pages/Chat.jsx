import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import { QUERY_CHATROOM, QUERY_MESSAGES } from "../utils/queries";
import { MESSAGES_SUBSCRIPTION } from "../utils/subscriptions";
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
  const { data } = useQuery(QUERY_CHATROOM, {
    variables: { id: chatRoomId },
  });

  const { data: messageData } = useQuery(QUERY_MESSAGES, {
    variables: { chatRoomId },
  });

  const { data: subscriptionData } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { chatRoomId },
  });

  useEffect(() => {
    if (subscriptionData) {
      console.log(subscriptionData);
      setMessages([...messages, subscriptionData.messageAdded]);
      setTimeout(() => {
        scrollToBottom("smooth");
        console.log("New Message added!");
      }, 200);
    }
  }, [subscriptionData]);

  useEffect(() => {
    if (messageData) setMessages(messageData?.messages);

    setTimeout(() => {
      scrollToBottom("instant");
    }, 200);
  }, [messageData]);

  const scrollToTop = () => {
    // scroll to top of page
    subTitle.current.scrollIntoView({
      // scroll page to the location where the element with ref={subTitle} is located
      behavior: "smooth", // set scroll behavior to smooth
      block: "center", // set scroll block to center
    });
  };

  const scrollToBottom = (behavior) => {
    // scroll to bottom of page
    subList.current.scrollIntoView({
      // scroll page to the location where the element with ref={subList} is located
      behavior: behavior, // set scroll behavior to smooth
      block: "center", // set scroll block to center
    });
  };

  const checkIfUserCreatedMessage = (message) => {
    if (!token) return false; // if user is not logged in, return false (user is not logged in if token is null)

    // Get the username from Auth.getProfile().data.username
    const loggedInUser = Auth.getProfile().data.username || null;

    // User is logged in, check if the message username is the same as the logged in user
    if (message?.username === loggedInUser) return true; // if message username is the same as the logged in user, return true

    return false; // if message username is not the same as the logged in user, return false
  };

  return (
    <div ref={containerEl}>
      <Header />
      <main className="container mx-4">
        <h2 ref={subTitle} className="subtitle">
          {data?.chatRoom.name}
        </h2>
        <RemoveAllMessages chatRoomId={chatRoomId} />
        {messages?.map((message) => (
          <section className="p-4" key={message?._id}>
            <strong>{message?.username}</strong>
            <div
              className={
                checkIfUserCreatedMessage(message)
                  ? "notification is-info mb-0"
                  : "notification is-light mb-0"
              }
            >
              {message?.messageText}
            </div>
            <span className="is-size-7">
              {dateFormat(message?.createdAt, "dateAndTime")}
            </span>
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
