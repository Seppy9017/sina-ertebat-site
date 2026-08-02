import { CheckIcon } from "../icons.jsx";

const MessageHandler = ({ message, setFunction, type, state }) => {
  if (type === "error") {
    setFunction(true);
    setTimeout(() => {
      setFunction(false);
    }, 3000);
    return <div className="admin-error">{message}</div>;
  } else if (type === "success") {
    setFunction(true);
    setTimeout(() => {
      setFunction(false);
    }, 3000);

    return (
      <div className="admin-success">
        <CheckIcon size={16} />
        {message}
      </div>
    );
  }
};

export default MessageHandler;
