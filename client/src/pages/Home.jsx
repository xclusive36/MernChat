import { useMutation } from "@apollo/client";
import { ADD_CHATROOM } from "../utils/mutations";
import Auth from "../utils/auth";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [addChatroom, { error }] = useMutation(ADD_CHATROOM);

  const handleAddChatroom = async (event) => {
    event.preventDefault();

    const headers = {
      // define headers variable for simplicity
      headers: {
        // define headers
        Authorization: `Bearer ${Auth.getToken()}`, // set Authorization to Bearer token
      },
    };

    const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      // if token is null
      console.log("No token provided"); // log "No token provided"
      return false; // return false
    }

    const chatroomName = event.target.elements[0].value.trim();
    if (chatroomName) {
      try {
        const { data } = await addChatroom({
          variables: { name: chatroomName },
          context: headers, // set context to headers
        });

        if (data) {
          event.target.elements[0].value = "";
        }
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    }
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
          <form onSubmit={handleAddChatroom} className="add-chatroom-form">
            <div className="field">
              <label className="label">Chatroom Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter a chatroom name"
                />
                <button className="button is-primary">Add Chatroom</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
