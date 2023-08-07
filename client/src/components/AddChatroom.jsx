import { useMutation } from "@apollo/client";
import { ADD_CHATROOM } from "../utils/mutations";
import Auth from "../utils/auth";

const AddChatroom = () => {
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

        // window.location.assign("/chatroom/" + data.addChatroom._id);
        console.log("Chatroom added successfully!");

        return true;
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleAddChatroom} className="add-chatroom-form">
      <div className="field">
        <label className="label">Add Chatroom</label>
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
  );
};

export default AddChatroom;
