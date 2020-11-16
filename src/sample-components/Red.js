import React from "react";
import Component from "../layout/Component";

const Red = ({ style }) => {
  return <Component style={{ ...style, backgroundColor: "red" }} />;
};

export default Red;
