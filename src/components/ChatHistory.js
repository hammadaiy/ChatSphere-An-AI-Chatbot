import React, { useState, useContext } from "react";
import { ListGroup, FormControl, Button } from "react-bootstrap";
import { ChatLeftText, Pencil, Trash } from "react-bootstrap-icons";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

const ChatHistory = ({
  history,
  onSelectChat,
  onUpdateChatName,
  onDeleteChat,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newChatName, setNewChatName] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const handleEditClick = (index, currentName, event) => {
    event.stopPropagation();
    setEditingIndex(index);
    setNewChatName(currentName);
  };

  const handleSaveClick = (index, event) => {
    event.stopPropagation();
    onUpdateChatName(index, newChatName);
    setEditingIndex(null);
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
    onSelectChat(index);
  };

  const handleDeleteClick = (index, event) => {
    event.stopPropagation();
    onDeleteChat(index);
    if (selectedChat === index) {
      setSelectedChat(null);
    }
  };

  return (
    <div className="chat-history">
      <ListGroup>
        {history.map((chat, index) => (
          <ListGroup.Item
            key={index}
            className={`d-flex justify-content-between align-items-center chat-history-item ${
              selectedChat === index ? "active" : ""
            }`}
            onClick={() => handleSelectChat(index)}
          >
            {editingIndex === index ? (
              <>
                <FormControl
                  type="text"
                  value={newChatName}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setNewChatName(e.target.value)}
                  className="me-2"
                  autoFocus
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={(e) => handleSaveClick(index, e)}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <ChatLeftText className="me-2" size={16} />
                  <span>{chat.title}</span>
                </div>
                <div className="history-actions">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={(e) => handleEditClick(index, chat.title, e)}
                    className="me-1"
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={(e) => handleDeleteClick(index, e)}
                  >
                    <Trash size={14} />
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
