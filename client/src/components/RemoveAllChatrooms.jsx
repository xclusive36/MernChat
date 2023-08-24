import { useMutation } from "@apollo/client";
import { REMOVE_ALL_CHATROOMS } from "../utils/mutations";

const RemoveAllChatrooms = () => {
  const [removeAllChatrooms] = useMutation(REMOVE_ALL_CHATROOMS);

  const handleRemoveAllChatrooms = async (e) => {
    e.preventDefault();

    try {
      await removeAllChatrooms({
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
    <button
      onClick={() => {
        handleRemoveAllChatrooms();
      }}
    >
      Remove All Chatrooms
    </button>
  );
};

export default RemoveAllChatrooms;
