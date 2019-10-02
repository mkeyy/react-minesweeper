import React from "react";

export default function Field(props) {
  return (
    <button
      className={`rm-field${props.data.active ? " rm-field--active" : ""}`}
      onClick={() => props.onLeftClick(props.data.x, props.data.y)}
      onContextMenu={evt => props.onRightClick(props.data.x, props.data.y, evt)}
      disabled={props.data.active ? true : false}
    >
      {props.data.active && props.data.content}
    </button>
  );
}
