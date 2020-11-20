import React from "react";
import "./Component.css";

const Component = function Component({ id, isChanged, style }, ref) {
  return <div className="Component" style={style} />;
};
Component.displayName = "Component";

export default Component;
