import { useEffect, useState } from "react";
import { useQuery, 
 } from "@apollo/client";
import {
  QUERY_CHATROOMS_SORT,
  QUERY_CHATROOMS_SORT_COUNT,
} from "../utils/queries";

import AddChatroom from "../components/AddChatroom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // define searchTerm state variable as [searchTerm, setSearchTerm]
  const [isModalActive, setIsModalActive] = useState(false); // define isModalActive state variable as [isModalActive, setIsModalActive]
  const [chatRooms, setChatRooms] = useState([]);
  const { data, loading, fetchMore } = useQuery(QUERY_CHATROOMS_SORT, {
    variables: { offset: 0, limit: 10, searchTerm: searchTerm },
    nextFetchPolicy: "cache-first",
  }); // use QUERY_CHATROOMS_SORT instead of QUERY_CHATROOMS
  const { data: chatRoomsCountData } = useQuery(QUERY_CHATROOMS_SORT_COUNT, {
    variables: { searchTerm: searchTerm },
  });

  useEffect(() => {
    if (data) setChatRooms(data.chatRoomsSort);
  }, [data]);

  // define handleSearchTermChange function
  const handleSearchTermChange = (event) => {
    // sanitize input by making sure it doesn't contain any special characters or spaces
    const term = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setSearchTerm(term); // set searchTerm to term
  };

  // define handleNextPage function
  const handleNextPage = async (e) => {
    e.preventDefault();

    const fetchMoreData = await fetchMore({
      variables: {
        offset: data.chatRoomsSort.length,
      },
    });

    const mergeArray = [...chatRooms, ...fetchMoreData.data.chatRoomsSort];
    setChatRooms(mergeArray);
  };

  return (
    <>
      <Header />
      <main className="container is-fluid">
        <article className="mt-4 panel is-info">
          <p className="panel-heading">Chatrooms</p>
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
              {chatRooms.map((chatRoom) => (
                <div key={chatRoom._id}>
                  <a href={`/chat/${chatRoom._id}`} className="panel-block">
                    <span className="panel-icon">
                      <i className="fas fa-book" aria-hidden="true"></i>
                    </span>
                    {chatRoom.name}
                  </a>
                </div>
              ))}

              <nav
                className="pagination px-4 py-2 is-centered is-small"
                role="navigation"
                aria-label="pagination"
              >
                <div className="control is-expanded">
                  <button
                    onClick={handleNextPage}
                    disabled={
                      chatRoomsCountData?.chatRoomsSortCount ===
                      chatRooms?.length
                    }
                    className={
                      chatRoomsCountData?.chatRoomsSortCount ===
                      chatRooms?.length
                        ? "is-hidden"
                        : "button is-primary is-fullwidth"
                    }
                  >
                    Load more...
                  </button>
                </div>
              </nav>
            </>
          )}
        </article>
      </main>
      <Footer setIsModalActive={setIsModalActive} />
      <AddChatroom
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
    </>
  );
};

export default Home;
