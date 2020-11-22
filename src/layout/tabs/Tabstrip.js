import React from "react";
import cx from "classnames";
import useTabstrip from "./useTabstrip";

import "./Tabstrip.css";

const Tabstrip = (props) => {
  const { tabProps, tabs } = useTabstrip(props);
  const { children, style, closeButton, onClose, value } = props;

  const renderTabs = () =>
    React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        index,
        ...tabProps,
        ref: tabs[index],
        selected: index === value
      })
    );
  return (
    <div className={cx("Tabstrip")} role="tablist" style={style}>
      {renderTabs()}
      {closeButton ? <button onClick={onClose}>X</button> : null}
    </div>
  );
};

export default Tabstrip;
