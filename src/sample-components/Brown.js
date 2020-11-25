import React from "react";
import { Component, registerComponent } from "../layout";

const Brown = ({ style }) => {
  return <Component style={{ ...style, backgroundColor: "brown" }} />;
};

export default Brown;

registerComponent("Brown", Brown);
