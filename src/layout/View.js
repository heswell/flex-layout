import React from "react";
import Header from "./Header";
import { registerComponent } from "./registry/ComponentRegistry";
import useLayout from "./useLayout";
import { Action } from "./layout-action";

import "./View.css";

const View = React.memo(function View(props) {
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const { children, style, header } = props;
  const headerProps = typeof header === "object" ? header : {};
  const handleClose = () => {
    dispatch({ type: Action.REMOVE, layoutModel });
  };

  return (
    <div className="View" style={style}>
      {header ? <Header {...headerProps} onClose={handleClose} /> : null}
      <div className="view-main">{children}</div>
    </div>
  );
});
View.displayName = "View";

export default View;

registerComponent("View", View, true);
