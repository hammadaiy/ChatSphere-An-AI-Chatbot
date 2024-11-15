import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "../App.css";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <div className="chat-input">
      <TextField
        variant="outlined"
        color="white"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="chat-input-field"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendClick}
        className="chat-send-button"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
