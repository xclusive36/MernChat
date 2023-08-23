import { createRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth.js";

const AddMessage = ({ chatRoomId, messages, setMessages, scrollToTop }) => {
  const [addMessage, { error }] = useMutation(ADD_MESSAGE);
  const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null
  const footerDocument = createRef();

  if (!token) {
    window.location.assign("/");
  }

  const handleAddMessage = async (event) => {
    event.preventDefault();

    const headers = {
      // define headers variable for simplicity
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    };

    if (!token) {
      // if token is null
      console.log("No token provided"); // log "No token provided"
      return false; // return false
    }

    const messageText = event.target[0].value;
    if (messageText) {
      try {
        const { data } = await addMessage({
          variables: { messageText, chatRoomId },
          context: headers, // set context to headers
        });

        if (data) {
          setMessages([data.addMessage, ...messages]);
          event.target[0].value = "";
          scrollToTop();
          console.log("Message added successfully!");

          return true;
        }
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    }
  };

  return (
    <footer ref={footerDocument} className="footer page-footer">
      <form onSubmit={handleAddMessage}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Message"
              disabled={!Auth.loggedIn()}
            />
          </div>
          <div className="control">
            <button
              type="submit"
              disabled={!Auth.loggedIn()}
              className="mx-2 button is-primary"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </footer>
  );
};

export default AddMessage;
