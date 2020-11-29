import React, { useRef } from "react";
import Header from "./Header";
import { isRegistered, registerComponent } from "./registry/ComponentRegistry";
import ViewContext from "./ViewContext";
import { typeOf } from "./utils";
import useLayout from "./useLayout";
import { Action } from "./layout-action";

import "./View.css";

const View = React.memo(function View(inputProps) {
  const [props, dispatch] = useLayout("View", inputProps);
  console.log(`[View] render ${props.title} ${props.path}`);
  const root = useRef(null);
  const { children, id, header, path, style, title } = props;
  const headerProps = typeof header === "object" ? header : {};
  const handleClose = () => {
    dispatch({ type: Action.REMOVE, path: props.path });
  };

  const dispatchAction = (action, evt) => {
    if (action === "close") {
      handleClose();
    } else if (action.type === "mousedown") {
      handleMouseDown(evt);
    }
  };

  const handleMouseDown = (evt) => {
    evt.stopPropagation();
    const dragRect = root.current.getBoundingClientRect();
    // when would we ever have this onMouseDown ?s
    if (props.onMouseDown) {
      props.onMouseDown({ path: props.path });
    } else {
      // We're expecting children to be a single element
      const componentType = typeOf(children);
      if (!isRegistered(componentType)) {
        registerComponent(componentType, children.type);
      }
      // TODO should we check if we are allowed to drag ?
      dispatch({ type: Action.DRAG_START, evt, path, dragRect });
    }
  };

  return (
    <div className="View" id={id} ref={root} style={style}>
      <ViewContext.Provider value={{ dispatch: dispatchAction, path, title }}>
        {header ? <Header {...headerProps} onClose={handleClose} /> : null}
        <div className="view-main">{children}</div>
      </ViewContext.Provider>
    </div>
  );
});
View.displayName = "View";

export default View;

registerComponent("View", View);
