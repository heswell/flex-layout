import React from "react";
import Header from "./Header";
import { registerComponent } from "./registry/ComponentRegistry";

import "./View.css";

const View = React.memo(function View(
  { children, id, style, header, title },
  ref
) {
  return (
    <div className="View" style={style}>
      {header ? <Header title={title} /> : null}
      <div className="view-main">{children}</div>
    </div>
  );
});
View.displayName = "View";

export default View;

registerComponent("View", View, true);
