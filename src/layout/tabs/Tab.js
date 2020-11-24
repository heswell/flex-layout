import React, { forwardRef, useImperativeHandle, useRef } from "react";
import cx from "classnames";
import { useForkRef } from "../utils";
import { CloseIcon } from "../icons";

import "./Tab.css";

const CloseButton = ({ onClick }) => {
  return (
    <div className="Tab-close" onClick={onClick}>
      <CloseIcon />
    </div>
  );
};

const Tab = forwardRef(
  (
    {
      ariaControls,
      deletable,
      selected,
      id,
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
      focus: () => root.current.focus(),
      measure: () => root.current.getBoundingClientRect()
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

    const handleCloseButtonClick = (e) => {
      e.stopPropagation();
      onDelete(e, index);
    };

    return (
      <button
        aria-controls={ariaControls}
        aria-selected={selected}
        className={cx("Tab", { selected })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        ref={setRef}
        id={id}
        role="tab"
        tabIndex={selected ? undefined : -1}
      >
        <span>{label}</span>
        {deletable ? <CloseButton onClick={handleCloseButtonClick} /> : null}
      </button>
    );
  }
);

export default Tab;
