import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import "../App.css";

const ChatHistory = ({ history, onSelectChat }) => {
  return (
    <List>
      {history.map((chat, index) => (
        <ListItem button key={index} onClick={() => onSelectChat(index)}>
          <ListItemText primary={chat.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatHistory;
