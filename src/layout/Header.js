import React from "react";
import "./Header.css";

const Header = ({ style, title, closeButton, onClose }) => {
  return (
    <div className="Header" style={style}>
      <span className="title">{title}</span>
      {closeButton ? <button onClick={onClose}>X</button> : null}
    </div>
  );
};

export default Header;
