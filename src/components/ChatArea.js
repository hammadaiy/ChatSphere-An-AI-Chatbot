import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import "../App.css";

const ChatArea = ({ messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box className="chat-area">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message-container ${
            msg.sender === "User"
              ? "user-message-container"
              : "ai-message-container"
          }`}
        >
          <div
            className={`chat-message ${
              msg.sender === "User" ? "user-message" : "ai-message"
            }`}
          >
            {msg.text}
          </div>
          <div
            className={`chat-badge ${
              msg.sender === "User" ? "user-badge" : "ai-badge"
            }`}
          >
            {msg.sender === "User" ? "U" : "AI"}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </Box>
  );
};

export default ChatArea;
