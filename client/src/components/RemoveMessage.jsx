import { useMutation } from "@apollo/client";
import { REMOVE_MESSAGE } from "../utils/mutations";

const RemoveMessage = ({ messageId }) => {
  const [removeMessage] = useMutation(REMOVE_MESSAGE);

  const handleRemoveMessage = async (e) => {
    e.preventDefault();

    try {
      await removeMessage({
        variables: { id: messageId },
        context: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("id_token")}`,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button className="button is-small is-danger" onClick={handleRemoveMessage}>
      Delete
    </button>
  );
};

export default RemoveMessage;
