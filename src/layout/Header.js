import React from "react";
import { Toolbar } from "./toolbar";
import { CloseIcon } from "./icons";

import "./Header.css";

const Header = ({ style, title, closeButton, onClose }) => {
  return (
    <Toolbar
      className="Header"
      style={{ justifyContent: "flex-end" }}
      draggable
      showTitle
    >
      <CloseIcon onClick={onClose} />
    </Toolbar>
  );
};

export default Header;
