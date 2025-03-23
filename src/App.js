import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col, Navbar, Button } from "react-bootstrap";
import { PlusLg, MoonFill, SunFill, List, X } from "react-bootstrap-icons";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import Settings from "./components/Settings";
import { ThemeContext } from "./context/ThemeContext";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

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
    if (window.innerWidth <= 768) {
      setShowSidebar(false);
    }
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" className="navbar">
        <Container fluid>
          <button
            className="hamburger-btn me-2"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <List size={24} />
          </button>
          <Navbar.Brand className="brand-font">ChatSphere</Navbar.Brand>
          <button
            className="theme-toggle ms-auto"
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <SunFill className="theme-icon" />
            ) : (
              <MoonFill className="theme-icon" />
            )}
          </button>
        </Container>
      </Navbar>

      {/* Backdrop overlay for mobile */}
      <div
        className={`overlay ${showSidebar ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      <Container fluid className="flex-grow-1 d-flex p-0">
        <Row className="flex-grow-1 w-100 g-0">
          <Col md={3} className={`sidebar ${showSidebar ? "show" : ""}`}>
            {/* Close button for mobile */}
            <button
              className="sidebar-close"
              onClick={closeSidebar}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <Button
              variant="outline-secondary"
              className="new-chat-button"
              onClick={handleNewChat}
            >
              <PlusLg className="new-chat-icon" size={16} /> New chat
            </Button>
            <h6 className="sidebar-title">Chat history</h6>
            <ChatHistory
              history={history}
              onSelectChat={handleSelectChat}
              onUpdateChatName={handleUpdateChatName}
              onDeleteChat={handleDeleteChat}
            />
            <h6 className="sidebar-title">Select a Model</h6>
            <Settings
              models={models}
              onSelectModel={handleSelectModel}
              selectedModel={selectedModel}
            />
          </Col>
          <Col md={9} className="main-content">
            <div className="chat-container">
              <ChatArea messages={messages} />
              <ChatInput onSend={handleSend} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
