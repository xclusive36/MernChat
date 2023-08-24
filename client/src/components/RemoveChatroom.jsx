import { useMutation } from "@apollo/client";
import { REMOVE_CHATROOM } from "../utils/mutations";

const RemoveChatroom = ({ chatRoomId }) => {
  const [removeChatRoom] = useMutation(REMOVE_CHATROOM);

  const handleRemoveChatroom = async (e) => {
    e.preventDefault();

    try {
      await removeChatRoom({
        variables: { id: chatRoomId },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="button is-danger" onClick={handleRemoveChatroom}>
      Delete
    </button>
  );
};

export default RemoveChatroom;
