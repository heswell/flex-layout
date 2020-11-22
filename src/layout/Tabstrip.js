import React, { forwardRef, useImperativeHandle, useRef } from "react";
import cx from "classnames";
import { useForkRef } from "./utils";

import "./Tabstrip.css";

// Question do we spread other props onto button ?
export const Tab = forwardRef(
  (
    {
      // children,
      selected,
      index,
      label,
      onClick,
      onKeyDown,
      onKeyUp
    },
    ref
  ) => {
    const root = useRef(null);
    const setRef = useForkRef(ref, root);

    useImperativeHandle(ref, () => ({
      focus: () => root.current.focus()
    }));

    const handleClick = (e) => {
      e.preventDefault();
      onClick(e, index);
    };
    const handleKeyDown = (e) => {
      onKeyDown(e, index);
    };
    const handleKeyUp = (e) => {
      onKeyUp(e, index);
    };
    return (
      <button
        className={cx("Tab", { selected })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        ref={setRef}
        role="tab"
      >
        {label}
      </button>
    );
  }
);

const Tabstrip = ({ children, style, closeButton, onClose }) => {
  return (
    <div className={cx("Tabstrip")} role="tablist" style={style}>
      {children}
      {closeButton ? <button onClick={onClose}>X</button> : null}
    </div>
  );
};

export default Tabstrip;
