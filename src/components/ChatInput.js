import React, { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendClick();
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [text]);

  const ArrowIcon = () => (
    <svg
      className="send-icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      stroke="currentColor"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );

  return (
    <div className="chat-input-container">
      <textarea
        ref={textareaRef}
        className="chat-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Send a message..."
        rows="1"
      />
      <button
        className="send-button"
        onClick={handleSendClick}
        disabled={!text.trim()}
        aria-label="Send message"
      >
        <ArrowIcon />
      </button>
    </div>
  );
};

export default ChatInput;
