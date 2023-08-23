import { useEffect, useState } from "react";
import { useQuery, 
  // useMutation
 } from "@apollo/client";
import {
  QUERY_CHATROOMS_SORT,
  QUERY_CHATROOMS_SORT_COUNT,
} from "../utils/queries";
// import { REMOVE_CHATROOM } from "../utils/mutations";

import AddChatroom from "../components/AddChatroom";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import Auth from "../utils/auth";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // define searchTerm state variable as [searchTerm, setSearchTerm]
  const [isModalActive, setIsModalActive] = useState(false); // define isModalActive state variable as [isModalActive, setIsModalActive]
  const [chatRooms, setChatRooms] = useState([]);
  const { data, loading, fetchMore } = useQuery(QUERY_CHATROOMS_SORT, {
    variables: { offset: 0, limit: 10, searchTerm: searchTerm },
    nextFetchPolicy: "cache-first",
    // fetchPolicy: "no-cache",
  }); // use QUERY_CHATROOMS_SORT instead of QUERY_CHATROOMS
  const { data: chatRoomsCountData } = useQuery(QUERY_CHATROOMS_SORT_COUNT, {
    variables: { searchTerm: searchTerm },
  });

  // const [removeChatRoom] = useMutation(REMOVE_CHATROOM);
  // const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

  useEffect(() => {
    if (data) setChatRooms(data.chatRoomsSort);
  }, [data]);

  // const handleRemoveChatRoom = async (e, chatRoomId) => {
  //   e.preventDefault();

  //   const headers = {
  //     // define headers variable for simplicity
  //     headers: {
  //       // define headers
  //       Authorization: `Bearer ${Auth.getToken()}`, // set Authorization to Bearer token
  //     },
  //   };

  //   if (!token) {
  //     // if token is null
  //     console.log("No token provided"); // log "No token provided"
  //     return false; // return false
  //   }

  //   try {
  //     await removeChatRoom({
  //       variables: { id: chatRoomId },
  //       context: headers, // set context to headers
  //     });
  //     const newChatRooms = chatRooms.filter(
  //       (chatRoom) => chatRoom._id !== chatRoomId
  //     );
  //     setChatRooms(newChatRooms);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
                  {/* <button
                    className="button"
                    disabled={!token}
                    onClick={(e) => handleRemoveChatRoom(e, chatRoom._id)}
                  >
                    <i className="fas fa-trash" aria-hidden="true"></i>
                  </button> */}
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
