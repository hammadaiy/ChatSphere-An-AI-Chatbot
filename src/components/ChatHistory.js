import React, { useState } from "react";
import { ListGroup, FormControl, Button } from "react-bootstrap";
import editIcon from "../assets/images/edit.png";
import deleteIcon from "../assets/images/delete.png";
import "../App.css";

const ChatHistory = ({
  history,
  onSelectChat,
  onUpdateChatName,
  onDeleteChat,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newChatName, setNewChatName] = useState("");

  const handleEditClick = (index, currentName) => {
    setEditingIndex(index);
    setNewChatName(currentName);
  };

  const handleSaveClick = (index) => {
    onUpdateChatName(index, newChatName);
    setEditingIndex(null);
  };

  return (
    <div className="chat-history">
      <ListGroup>
        {history.map((chat, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center chat-history-item"
          >
            {editingIndex === index ? (
              <>
                <FormControl
                  type="text"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  className="me-2"
                />
                <Button
                  variant="success"
                  onClick={() => handleSaveClick(index)}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <span onClick={() => onSelectChat(index)}>{chat.title}</span>
                <div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleEditClick(index, chat.title)}
                  >
                    <img src={editIcon} alt="Edit" className="icon" />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteChat(index)}
                    className="ms-2"
                  >
                    <img src={deleteIcon} alt="Delete" className="icon" />
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatHistory;
