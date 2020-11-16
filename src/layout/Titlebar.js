import React from "react";

const Titlebar = ({ style, title }) => {
  return (
    <div className="Titlebar" style={style}>
      <span className="title">{title}</span>
    </div>
  );
};

export default Titlebar;
