import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import Settings from "./components/Settings";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    // Fetch available models from LM Studio
    axios
      .get("http://localhost:1234/v1/models")
      .then((response) => {
        setModels(response.data.data);
        setSelectedModel(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

  const handleSend = (text) => {
    const newMessage = { sender: "User", text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (!selectedModel) {
      console.error("No model selected");
      return;
    }

    // Call LM Studio API to get AI response
    axios
      .post("http://localhost:1234/v1/chat/completions", {
        model: selectedModel.id,
        messages: [{ role: "user", content: text }],
      })
      .then((response) => {
        const aiMessage = {
          sender: "AI",
          text: response.data.choices[0].message.content,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      })
      .catch((error) => {
        console.error("Error getting AI response:", error);
      });
  };

  const handleNewChat = () => {
    setHistory([...history, { title: `Chat ${history.length + 1}`, messages }]);
    setMessages([]);
  };

  const handleSelectChat = (index) => {
    setMessages(history[index].messages);
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
  };

  const handleUpdateChatName = (index, newName) => {
    const updatedHistory = history.map((chat, i) =>
      i === index ? { ...chat, title: newName } : chat
    );
    setHistory(updatedHistory);
  };

  const handleDeleteChat = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  return (
    <div className="app-container">
      <Navbar
        bg="dark"
        variant="dark"
        className="navbar"
        style={{ width: "98%" }}
      >
        <Container>
          <Navbar.Brand className="poppins-font">ChatSphere</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="flex-grow-1 d-flex">
        <Row className="flex-grow-1 w-100">
          <Col md={9} className="main-content p-3 d-flex flex-column">
            <ChatArea messages={messages} className="chat-area" />
            <ChatInput onSend={handleSend} className="chat-input" />
          </Col>
          <Col md={3} className="sidebar p-3">
            <Button
              variant="outline-secondary"
              className="new-chat-button w-100 mb-3"
              onClick={handleNewChat}
            >
              <i className="bi bi-plus new-chat-icon"></i> New Chat
            </Button>
            <h6 className="sidebar-title">Chat History</h6>
            <ChatHistory
              history={history}
              onSelectChat={handleSelectChat}
              onUpdateChatName={handleUpdateChatName}
              onDeleteChat={handleDeleteChat}
            />
            <hr />
            <h6 className="sidebar-title">Settings</h6>
            <Settings
              models={models}
              onSelectModel={handleSelectModel}
              selectedModel={selectedModel}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
