import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHATROOMS_SORT } from "../utils/queries";

import AddChatroom from "../components/AddChatroom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [limit, setLimit] = useState(10); // define limit state variable as limit, setLimit
  const [searchTerm, setSearchTerm] = useState(""); // define searchTerm state variable as [searchTerm, setSearchTerm
  const { loading, data, fetchMore } = useQuery(QUERY_CHATROOMS_SORT, {
    variables: { offset: 0, limit: limit, searchTerm },
  }); // use QUERY_CHATROOMS_SORT instead of QUERY_CHATROOMS

  // define handleSearchTermChange function
  const handleSearchTermChange = (event) => {
    // sanitize input by making sure it doesn't contain any special characters or spaces
    const term = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setSearchTerm(term); // set searchTerm to term
  };

  // define handleNextPage function
  const handleNextPage = async (e) => {
    e.preventDefault();
    await fetchMore({
      variables: { offset: data.chatRoomsSort.length }, // set variables to { offset: limit * page, limit: limit }
    });
  };

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
                onChange={handleSearchTermChange}
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {data.chatRoomsSort.map((chatRoom) => (
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
              ))}

              <nav
                className="pagination px-4 py-2 is-centered is-small"
                role="navigation"
                aria-label="pagination"
              >
                <a onClick={handleNextPage} className="pagination-next">
                  Fetch more...
                </a>
              </nav>
            </>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default Home;
