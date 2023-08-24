import { useMutation } from "@apollo/client";
import { REMOVE_ALL_MESSAGES } from "../utils/mutations";

const RemoveAllMessages = ({ chatRoomId }) => {
  const [removeAllMessages] = useMutation(REMOVE_ALL_MESSAGES);

  const handleRemoveAllMessages = async (e) => {
    e.preventDefault();

    try {
      await removeAllMessages({
        variables: {
          chatRoomId: chatRoomId,
        },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        },
      })
      .then(() => location.reload());
    } catch (err) {
      console.error(err);
      console.log("User not logged in!")
    }
  };

  return (
    <button
      onClick={handleRemoveAllMessages}
      className="button is-small is-danger"
    >
      Delete All Messages
    </button>
  );
};

export default RemoveAllMessages;
