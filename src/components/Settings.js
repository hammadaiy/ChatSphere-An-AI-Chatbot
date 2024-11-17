import React from "react";
import { ListGroup } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import "../App.css";

const Settings = ({ models, onSelectModel, selectedModel }) => {
  if (models.length === 0) {
    return <div>No models available</div>;
  }

  return (
    <div className="settings">
      <ListGroup>
        {models.map((model, index) => (
          <ListGroup.Item
            action
            key={index}
            onClick={() => onSelectModel(model)}
            className="settings-item"
          >
            {model.id}
            {selectedModel && selectedModel.id === model.id && (
              <Check className="tick-icon" />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Settings;
