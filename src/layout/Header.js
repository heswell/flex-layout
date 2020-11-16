import React from "react";
import "./Header.css";

const Header = ({ style, title }) => {
  return (
    <div className="Header" style={style}>
      <span className="title">{title}</span>
    </div>
  );
};

export default Header;
