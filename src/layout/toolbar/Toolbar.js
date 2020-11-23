import React, { useCallback, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { PopupService } from "@heswell/popup";
import { findFirstOverflow } from "./overflowUtils";

import * as icon from "../icons";
import useResizeObserver from "./useResizeObserver";
import { MoreVerticalIcon } from "../icons";

import "./Toolbar.css";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const Overflow = ({ onClick }) => {
  return (
    <button className="Toolbar-overflow" onClick={onClick}>
      <MoreVerticalIcon />
    </button>
  );
};

// const OverflowContainer = ({ tools }) => {
//   return (
//     <div className="OverflowContainer" style={{ width: 200, height: 300 }}>
//       <Toolbar allowWrap={10} tools={tools} />
//     </div>
//   );
// };

const Toolbar = ({ allowWrap = 2, children, className, tools }) => {
  const root = useRef(null);
  const innerContainer = useRef(null);
  const [height, setHeight] = useState(32);
  const [overflowing, setOverflowing] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);

  const handleOverflowClick = () => {
    setShowOverflow((show) => !show);
  };

  const renderTools = useCallback(
    () =>
      tools.map((tool, index) => {
        const Icon = icon[`${capitalize(tool)}Icon`];
        return (
          <span className="Tool" key={index}>
            <Icon />
          </span>
        );
      }),
    [tools]
  );

  const getOverflowedTools = useCallback(() => {
    const toolElements = Array.from(innerContainer.current.childNodes);
    const firstOverflowIdx = findFirstOverflow(toolElements, 64);
    return tools.slice(firstOverflowIdx);
  }, [tools]);

  useEffect(() => {
    if (showOverflow) {
      requestAnimationFrame(() => {
        // const {
        //   height,
        //   left,
        //   top,
        //   width
        // } = root.current.getBoundingClientRect();
        // PopupService.showPopup({
        //   left,
        //   maxWidth: width,
        //   top: top + height,
        //   component: <OverflowContainer tools={getOverflowedTools()} />
        // });
      });
    } else {
      PopupService.hidePopup();
    }
  }, [getOverflowedTools, showOverflow]);

  useResizeObserver(innerContainer, (rect) => {
    const { scrollHeight } = innerContainer.current;
    if (scrollHeight !== height.current) {
      const rows = scrollHeight / 32;
      if (rows <= allowWrap) {
        setHeight((height.current = scrollHeight));
        if (overflowing) {
          setOverflowing(false);
        }
      } else if (!overflowing) {
        setOverflowing(true);
      }
    }
  });
  return (
    <div
      className={cx("Toolbar", className, { "overflow-open": showOverflow })}
      ref={root}
      style={{ height }}
    >
      <div className="Toolbar-inner" ref={innerContainer}>
        {renderTools()}
      </div>
      {overflowing ? <Overflow onClick={handleOverflowClick} /> : null}
    </div>
  );
};

export default Toolbar;
