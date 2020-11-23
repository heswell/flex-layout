import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import cx from "classnames";
import { PopupService } from "../popup";
import { findFirstOverflow } from "./overflowUtils";

import * as icon from "../icons";
import useResizeObserver from "./useResizeObserver";
import { MoreVerticalIcon } from "../icons";

import "./Toolbar.css";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
const byDescendingStopSize = ([, s1], [, s2]) => s2 - s1;
const EMPTY_ARRAY = [];

const Overflow = ({ onClick }) => {
  return (
    <button className="Toolbar-overflow" onClick={onClick}>
      <MoreVerticalIcon />
    </button>
  );
};

const OverflowContainer = ({ tools }) => {
  return (
    <div className="OverflowContainer">
      <Toolbar allowWrap={10} height="auto" tools={tools} id="boogie" />
    </div>
  );
};

const Toolbar = ({
  maxRows = 2,
  children,
  className,
  height: heightProp = 32,
  id,
  sizes,
  tools,
  stops: stopsProp,
  getTools = () => tools
}) => {
  const root = useRef(null);
  const innerContainer = useRef(null);
  const [height, setHeight] = useState(heightProp);
  const [size, setSize] = useState("lg");
  const [overflowing, setOverflowing] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);
  const stops = stopsProp
    ? Object.entries(stopsProp).sort(byDescendingStopSize)
    : null;

  const minWidth = stops ? stops[stops.length - 1][1] : 0;

  const handleOverflowClick = () => {
    console.log("handleOverflowClick");
    setShowOverflow((show) => !show);
  };

  const renderTools = useCallback(
    (items = getTools(size)) =>
      items.map((tool, index) => {
        if (Array.isArray(tool)) {
          return (
            <span className="ToolTray" key={index}>
              {renderTools(tool)}
            </span>
          );
        } else {
          const Icon = icon[`${capitalize(tool)}Icon`];
          return (
            <span className="Tool" key={index}>
              <Icon />
            </span>
          );
        }
      }),
    [getTools, size]
  );

  useLayoutEffect(() => {
    if (sizes) {
      console.log(`sizes ${JSON.stringify(sizes)}`);
    }
  }, [sizes]);

  const getOverflowedTools = useCallback(() => {
    const toolElements = Array.from(innerContainer.current.childNodes);
    const firstOverflowIdx = findFirstOverflow(toolElements, 64);
    return getTools(size).slice(firstOverflowIdx);
  }, [getTools, size]);

  const handlePopupClosed = useCallback(() => {
    if (showOverflow) {
      setShowOverflow(false);
    }
  }, [showOverflow]);

  useEffect(() => {
    if (showOverflow) {
      requestAnimationFrame(() => {
        const {
          height,
          left,
          top,
          width
        } = root.current.getBoundingClientRect();
        PopupService.showPopup({
          right: left + width,
          maxWidth: width,
          top: top + height,
          component: <OverflowContainer tools={getOverflowedTools()} />,
          onClose: handlePopupClosed
        });
      });
    } else if (overflowing) {
      if (id === "boogie") {
        debugger;
      }
      console.log(`hide Popup #${id} ${overflowing}`);
      PopupService.hidePopup();
    }
  }, [getOverflowedTools, handlePopupClosed, id, overflowing, showOverflow]);

  useResizeObserver(
    innerContainer,
    heightProp === "auto" ? EMPTY_ARRAY : ["height"],
    ({ height: measuredHeight }) => {
      const rows = measuredHeight / 32;
      if (measuredHeight !== height) {
        if (rows <= maxRows) {
          setHeight(measuredHeight);
          if (overflowing) {
            setOverflowing(false);
          }
        } else if (!overflowing) {
          setOverflowing(true);
        }
      } else if (overflowing && rows <= maxRows) {
        setOverflowing(false);
      }
    }
  );
  const stopFromWidth = (w) => {
    if (stops) {
      for (let [name, size] of stops) {
        if (w >= size) {
          return name;
        }
      }
    }
  };

  // TODO set width only if stops configured
  useResizeObserver(
    root,
    stops ? ["width"] : EMPTY_ARRAY,
    ({ width: measuredWidth }) => {
      const stop = stopFromWidth(measuredWidth);
      if (stop !== size) {
        setSize(stop);
      }
    }
  );

  return (
    <div
      className={cx("Toolbar", className, size, {
        "overflow-open": showOverflow
      })}
      ref={root}
      style={{ height, minWidth }}
    >
      <div className="Toolbar-inner" ref={innerContainer}>
        {renderTools()}
      </div>
      {overflowing ? <Overflow onClick={handleOverflowClick} /> : null}
    </div>
  );
};

export default Toolbar;
