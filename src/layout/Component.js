import React, { forwardRef } from "react";

const Component = forwardRef(function Component({ style }, ref) {
  return <div className="Component" ref={ref} style={style} />;
});

export default Component;
