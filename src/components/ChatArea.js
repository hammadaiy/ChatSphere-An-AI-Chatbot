import React, { useEffect, useRef, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { PersonFill, Robot } from "react-bootstrap-icons";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

const ChatArea = ({ messages }) => {
  const chatEndRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-area">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-row ${
            msg.sender === "User" ? "user-message-row" : "ai-message-row"
          }`}
        >
          <div className={`avatar ${msg.sender === "User" ? "user" : "ai"}`}>
            {msg.sender === "User" ? (
              <PersonFill size={18} />
            ) : (
              <Robot size={18} />
            )}
          </div>
          <div className="message-content">
            {msg.sender === "User" ? (
              <div>{msg.text}</div>
            ) : (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            )}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatArea;
