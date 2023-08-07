import { useQuery } from "@apollo/client";
import { QUERY_CHATROOMS } from "../utils/queries";

import AddChatroom from "../components/AddChatroom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const { loading, data } = useQuery(QUERY_CHATROOMS);

  return (
    <>
      <Header />
      <main className="container is-fluid">
        <div className="page-title">Welcome to MernChat!</div>
        <div className="page-subtitle">
          A place to chat with your friends and family
        </div>
        <div className="add-chatroom">
          <AddChatroom />
        </div>

        <article className="mt-4 panel is-info">
          <p className="panel-heading">Chatrooms</p>
          <p className="panel-tabs">
            <a className="is-active">All</a>
            <a>Friends</a>
          </p>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-info"
                type="text"
                placeholder="Search"
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            data?.chatRooms.map((chatRoom) => (
              <a
                href={`/chat/${chatRoom._id}`}
                className="panel-block"
                key={chatRoom._id}
              >
                <span className="panel-icon">
                  <i className="fas fa-book" aria-hidden="true"></i>
                </span>
                {chatRoom.name}
              </a>
            ))
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Home;
