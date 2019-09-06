import React from "react";

export default function Field(props) {
  return (
    <button
      className={`rm-field${props.data.active ? " rm-field--active" : ""}`}
      onClick={() => props.onClick(props.x, props.y)}
      onContextMenu={evt => props.onContextMenu(props.x, props.y, evt)}
      disabled={props.data.active ? true : false}
    >
      {props.data.active && props.data.content}
    </button>
  );
}
