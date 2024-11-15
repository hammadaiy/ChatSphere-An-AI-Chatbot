// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Container,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import ChatHistory from "./components/ChatHistory";
import Settings from "./components/Settings";
import "./App.css";

const drawerWidth = 240;

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

  return (
    <Box sx={{ display: "flex" }} className="app-container">
      <CssBaseline />
      <AppBar className="navbar">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="poppins-font"
          >
            ChatSphere
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="main-content">
        <Toolbar />
        <Container className="chat-container">
          <ChatArea messages={messages} className="chat-area" />
          <ChatInput onSend={handleSend} className="chat-input" />
        </Container>
      </Box>
      <Drawer
        variant="permanent"
        anchor="right"
        className="sidebar"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }} className="sidebar-content">
          <List>
            <ListItem
              button
              onClick={handleNewChat}
              className="new-chat-button"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <ListItemIcon className="new-chat-icon">
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </ListItem>
            <Divider />
            <Typography variant="h6" className="sidebar-title">
              Chat History
            </Typography>
            <ChatHistory
              history={history}
              onSelectChat={handleSelectChat}
              className="chat-history"
            />
            <Divider />
            <Typography variant="h6" className="sidebar-title">
              Settings
            </Typography>
            <Settings
              models={models}
              onSelectModel={handleSelectModel}
              className="settings"
            />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default App;
