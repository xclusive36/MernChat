import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../utils/mutations";
import Auth from "../utils/auth.js"; // Auth utility provides various functions for authentication

const AddMessage = ({ chatRoomId, scrollToBottom }) => {
  // component Adds a message to the chat room. It is called when the form is submitted and takes in the chatRoomId, messages, setMessages, and scrollToBottom as props
  const [addMessage, { error }] = useMutation(ADD_MESSAGE); // add mutation function addMessage to mutate through the GraphQL API server
  const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

  const handleAddMessage = async (event) => {
    // function is called when form is submitted to add a message
    event.preventDefault(); // prevent default form submission

    if (!token) {
      // if token is null
      console.log("No token provided"); // log "No token provided"
      return false; // return false to exit function
    }

    const messageText = event.target[0].value; // set messageText variable to value of input field
    if (messageText) {
      // if messageText is not empty
      try {
        // try to execute addMessage mutation
        await addMessage({
          // await addMessage mutation with 2 variables and context object.
          // addMessage is a mutation call to the GraphQL API server
          variables: { messageText, chatRoomId },
          context: {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("id_token")}`,
            },
          },
        })
          // .then((res) => {
          //   setMessages([...messages, res.data.addMessage]);
          // })
          .then(() => {
            setTimeout(() => {
              event.target[0].value = "";
              event.target[0].focus();
              scrollToBottom();
              console.log("Message added successfully!");
            }, 200);
          });
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    }
  };

  return (
    <footer className="footer page-footer">
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
