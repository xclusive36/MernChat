import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CHATROOM } from "../utils/queries";

import Header from "../components/Header";
// import Footer from "../components/Footer";

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
      <main className="container mx-4">
        <h2 className="subtitle">{chatRoom?.name}</h2>
        <section className="p-4">
          <strong>Joshua</strong> <span className="is-size-7">2:30PM</span>
          <div className="notification is-info">
            Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
            diam, et dictum <a>felis venenatis</a> efficitur.
          </div>
        </section>
        <section className="p-4">
        <strong>Michele</strong> <span className="is-size-7">2:30PM</span>
          <div className="notification is-success is-light">
            Primar lorem ipsum dolor sit amet.
          </div>
        </section>
        <section className="p-4">
        <strong>Tobey</strong> <span className="is-size-7">2:30PM</span>
          <div className="notification is-light">
            Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
            diam, et dictum <a>felis venenatis</a> efficitur.
          </div>
        </section>
      </main>
      <footer className="footer page-footer">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Message"
                  />
                </p>
                <p className="control">
                  <button className="mx-2 button is-primary">Send</button>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Chat;
