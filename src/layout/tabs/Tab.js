import React, { forwardRef, useImperativeHandle, useRef } from "react";
import cx from "classnames";
import { useForkRef } from "../utils";

import "./Tab.css";

const Tab = forwardRef(
  (
    {
      deletable,
      selected,
      index,
      label,
      onClick,
      onDelete,
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
      switch (e.key) {
        case "Delete":
          if (deletable) {
            e.stopPropagation();
            onDelete(e, index);
          }
          break;
        default:
          onKeyUp(e, index);
      }
    };
    return (
      <button
        className={cx("Tab", { selected })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        ref={setRef}
        role="tab"
        tabIndex={selected ? undefined : -1}
      >
        {label}
      </button>
    );
  }
);

export default Tab;
