import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import "../App.css";

const Settings = ({ models, onSelectModel }) => {
  if (models.length === 0) {
    return <div>No models available</div>;
  }

  return (
    <List>
      {models.map((model, index) => (
        <ListItem button key={index} onClick={() => onSelectModel(model)}>
          <ListItemText primary={model.id} />
        </ListItem>
      ))}
    </List>
  );
};

export default Settings;
