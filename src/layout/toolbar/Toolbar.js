import React from "react";
import cx from "classname";

const Toolbar = ({ children, className }) => {
  return <div className={cx("Toolbar", className)}>{children}</div>;
};

export default Toolbar;
