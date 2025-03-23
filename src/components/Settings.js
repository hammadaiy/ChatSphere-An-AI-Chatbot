import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Check, Robot } from "react-bootstrap-icons";
import { ThemeContext } from "../context/ThemeContext";
import "../App.css";

const Settings = ({ models, onSelectModel, selectedModel }) => {
  const { darkMode } = useContext(ThemeContext);

  if (models.length === 0) {
    return (
      <div className="text-muted text-center p-3">No models available</div>
    );
  }

  return (
    <div className="settings">
      <ListGroup>
        {models.map((model, index) => (
          <ListGroup.Item
            action
            key={index}
            onClick={() => onSelectModel(model)}
            className={`settings-item ${
              selectedModel && selectedModel.id === model.id ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <Robot className="me-2" size={16} />
              <span>{model.id}</span>
            </div>
            {selectedModel && selectedModel.id === model.id && (
              <Check className="tick-icon" size={16} />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Settings;
