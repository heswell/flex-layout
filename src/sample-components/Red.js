import React from "react";
import { Component, registerComponent } from "../layout";

const Red = ({ style }) => {
  return <Component style={{ ...style, backgroundColor: "red" }} />;
};

export default Red;

registerComponent("Red", Red);
