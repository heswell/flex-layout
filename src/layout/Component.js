import React, { forwardRef } from "react";
import "./Component.css";

const Component = React.memo(
  forwardRef(function Component({ style }, ref) {
    return <div className="Component" ref={ref} style={style} />;
  })
);

Component.displayName = "Component";

export default Component;
