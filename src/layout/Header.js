import React from "react";
import "./Header.css";

const Header = ({ style, title, closeButton, onClose, onMouseDown }) => {
  return (
    <div className="Header" style={style} onMouseDown={onMouseDown}>
      <span className="title">{title}</span>
      {closeButton ? <button onClick={onClose}>X</button> : null}
    </div>
  );
};

export default Header;
