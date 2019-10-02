import React from "react";

export default function Modal(props) {
  return (
    <div className="rm-modal">
      <div className="rm-container">
        <h2 className="rm-h2">{props.title}</h2>
        <div className="rm-buttons">
          <button
            className="rm-btn rm-btn--primary"
            onClick={() => props.restart()}
          >
            Try again
          </button>
          <button className="rm-btn rm-btn--primary">Go to start</button>
        </div>
      </div>
    </div>
  );
}
