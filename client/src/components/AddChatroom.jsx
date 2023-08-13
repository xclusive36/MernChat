import { useMutation } from "@apollo/client";
import { ADD_CHATROOM } from "../utils/mutations";
import Auth from "../utils/auth";

const AddChatroom = ({ isModalActive, setIsModalActive }) => {
  const [addChatroom, { error }] = useMutation(ADD_CHATROOM);
  const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

  const handleAddChatroom = async (event) => {
    event.preventDefault();

    const headers = {
      // define headers variable for simplicity
      headers: {
        // define headers
        Authorization: `Bearer ${Auth.getToken()}`, // set Authorization to Bearer token
      },
    };

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
          console.log("Chatroom added successfully!");
          window.location.assign(`/chat/${data.addChatRoom._id}`);

          setIsModalActive(false);
          return true;
        }
      } catch (err) {
        console.error(err);
        console.error(error);
      }
    }
  };

  return (
    <div className={isModalActive ? "modal is-active" : "modal"}>
      <div
        onClick={() => setIsModalActive(false)}
        className="modal-background"
      ></div>
      <div className="modal-card">
        <form
          onSubmit={handleAddChatroom}
          className={token ? "add-chatroom-form" : "add-chatroom-form hidden"}
        >
          <header className="modal-card-head">
            <p className="modal-card-title">Create new chatroom</p>
            <button
              onClick={() => setIsModalActive(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Chatroom name"
                  disabled={!token}
                  required
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" disabled={!token}>
              Create
            </button>
            <button onClick={() => setIsModalActive(false)} className="button">
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AddChatroom;
