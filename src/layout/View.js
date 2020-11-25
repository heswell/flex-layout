import React, { useRef } from "react";
import Header from "./Header";
import { isRegistered, registerComponent } from "./registry/ComponentRegistry";
import { typeOf } from "./utils";
import useLayout from "./useLayout";
import { Action } from "./layout-action";

import "./View.css";

const View = React.memo(function View(props) {
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const root = useRef(null);
  const { children, style, header } = props;
  const headerProps = typeof header === "object" ? header : {};
  const handleClose = () => {
    dispatch({ type: Action.REMOVE, layoutModel });
  };

  const handleMouseDown = (evt) => {
    console.log("View:handleMouseDown");
    evt.stopPropagation();
    const dragRect = root.current.getBoundingClientRect();
    // when would we ever have this onMouseDown ?s
    if (props.onMouseDown) {
      props.onMouseDown({ layoutModel });
    } else {
      // We're expecting children to be a single element
      const componentType = typeOf(children);
      if (!isRegistered(componentType)) {
        registerComponent(componentType, children.type);
      }
      // TODO should we check if we are allowed to drag ?
      dispatch({ type: Action.DRAG_START, evt, layoutModel, dragRect });
    }
  };

  return (
    <div className="View" style={style} ref={root}>
      {header ? (
        <Header
          {...headerProps}
          onClose={handleClose}
          onMouseDown={handleMouseDown}
        />
      ) : null}
      <div className="view-main">{children}</div>
    </div>
  );
});
View.displayName = "View";

export default View;

registerComponent("View", View, true);
