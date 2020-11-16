import React, { forwardRef } from "react";
import Header from "./Header";
import "./View.css";

const View = React.memo(
  forwardRef(function View({ children, id, style, header, title }, ref) {
    console.log(`render #${id}`);
    return (
      <div className="View" ref={ref} style={style}>
        {header ? <Header title={title} /> : null}
        <div className="view-main">{children}</div>
      </div>
    );
  })
);
View.displayName = "View";

export default View;
