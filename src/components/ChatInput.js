import React, { useState } from "react";
import "../App.css";
import sendIcon from "../assets/images/send.png";

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
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <button className="send-button" onClick={handleSendClick}>
        <img src={sendIcon} alt="Send" className="send-icon" />
      </button>
    </div>
  );
};

export default ChatInput;
