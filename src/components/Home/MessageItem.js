import React, { useState } from "react";

const MessageItem = ({ authUser, message, removeMessage, editMessage }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(message.text);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditText(message.text);
  };

  const handleChangeEditText = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEditText = () => {
    editMessage(message, editText);
    setEditMode(false);
  };

  return (
    <li className="message-item">
      {editMode ? (
        <input type="text" value={editText} onChange={handleChangeEditText} />
      ) : (
        <span>
          <strong>{message.userId}</strong> {message.text}
          {message.editedAt && <span> (Edited) </span>}
        </span>
      )}

      {authUser.uid === message.userId && (
        <span>
          {editMode ? (
            <span>
              <button onClick={handleSaveEditText}>Save</button>
              <button onClick={toggleEditMode}>Reset</button>
            </span>
          ) : (
            <button onClick={toggleEditMode}>Edit</button>
          )}
          {!editMode && (
            <button type="button" onClick={() => removeMessage(message.uid)}>
              Delete
            </button>
          )}
        </span>
      )}
    </li>
  );
};

export default MessageItem;
