import React from "react";
import cx from "classname";

const ResponseBox = ({ children, className }) => {
  return <div className={cx("ResponseBox", className)}>{children}</div>;
};

export default ResponseBox;
