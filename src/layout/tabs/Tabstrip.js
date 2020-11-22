import React, { useRef } from "react";
import cx from "classnames";
import useTabstrip from "./useTabstrip";

import "./Tabstrip.css";

const Tabstrip = (props) => {
  const root = useRef(null);
  const { indicatorProps, tabProps, tabRef } = useTabstrip(props, root);
  const {
    children,
    activeIndicator = "bottom",
    style,
    closeButton,
    onClose,
    value
  } = props;

  const renderTabs = () =>
    React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        index,
        ...tabProps,
        ref: tabRef[index],
        selected: index === value
      })
    );

  return (
    <div className={cx("Tabstrip")} ref={root} role="tablist" style={style}>
      {renderTabs()}
      {activeIndicator ? (
        <div className="ActiveIndicator" {...indicatorProps} />
      ) : null}
      {closeButton ? <button onClick={onClose}>X</button> : null}
    </div>
  );
};

export default Tabstrip;
