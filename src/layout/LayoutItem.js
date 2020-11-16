import React from "react";
import Titlebar from "./Titlebar";

const LayoutItem = ({ children, backgroundColor, flexDirection, title }) => {
  return (
    <div
      className="LayoutItem"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Titlebar title={title} style={{ height: 32 }} />
      {children}
    </div>
  );
};

export default LayoutItem;
