import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ authUser, messages, removeMessage, editMessage }) => {
  return (
    <ul className="message-list">
      {messages.map((message) => (
        <MessageItem
          authUser={authUser}
          key={message.uid}
          message={message}
          editMessage={editMessage}
          removeMessage={removeMessage}
        />
      ))}
    </ul>
  );
};

export default MessageList;
