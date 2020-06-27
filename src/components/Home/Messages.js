import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import MessageList from "./MessageList";
import { AuthUserContext } from "../Session";

const Messages = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(5);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    listenForMessages();
    return () => firebase.messages().off();
  }, [limit]);

  const listenForMessages = () => {
    setLoading(true);

    firebase
      .messages()
      .orderByChild("createdAt")
      .limitToLast(limit)
      .on("value", (snapshot) => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map((key) => ({
            ...messageObject[key],
            uid: key,
          }));

          setMessages(messageList);
          setLoading(false);
        } else {
          setMessages(null);
          setLoading(false);
        }
      });
  };

  const onNextPage = () => {
    setLimit(limit + 5);
  };

  const handleCreateMessage = (e, authUser) => {
    e.preventDefault();

    firebase.messages().push({
      text,
      userId: authUser.uid,
      createdAt: firebase.serverValue.TIMESTAMP,
    });

    setText("");
  };

  const handleRemoveMessage = (uid) => {
    firebase.message(uid).remove();
  };

  const handleEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    firebase.message(uid).set({
      ...messageSnapshot,
      editedAt: firebase.serverValue.TIMESTAMP,
      text,
    });
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div className="message-page">
          {!loading && messages && (
            <button type="button" onClick={onNextPage}>
              More
            </button>
          )}

          {loading && <div>Loading...</div>}

          {messages ? (
            <MessageList
              authUser={authUser}
              messages={messages}
              editMessage={handleEditMessage}
              removeMessage={handleRemoveMessage}
            />
          ) : (
            <div>There are no messages...</div>
          )}

          <form onSubmit={(e) => handleCreateMessage(e, authUser)}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(Messages);
