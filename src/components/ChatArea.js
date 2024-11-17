import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "../App.css";

const ChatArea = ({ messages }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-area">
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
            {msg.sender === "User" ? (
              msg.text
            ) : (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            )}
            <div className="message-badge">
              {msg.sender === "User" ? "U" : "AI"}
            </div>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatArea;
