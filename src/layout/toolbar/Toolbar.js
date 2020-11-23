import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import cx from "classnames";
import ResponsiveContainer from "../responsive/ResponsiveContainer";
import { PopupService } from "../popup";
import { findFirstOverflow } from "./overflowUtils";

import * as icon from "../icons";
import useResizeObserver from "../responsive/useResizeObserver";
import { MoreVerticalIcon } from "../icons";

import "./Toolbar.css";

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
const EMPTY_ARRAY = [];

const Overflow = forwardRef(function Overflow({ onClick }, ref) {
  return (
    <button className="Toolbar-overflow" onClick={onClick} ref={ref}>
      <MoreVerticalIcon />
    </button>
  );
});

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
  stops,
  getTools = () => tools || React.Children.toArray(children)
}) => {
  const root = useRef(null);
  const overflowButton = useRef(null);
  const innerContainer = useRef(null);
  const [height, setHeight] = useState(heightProp);
  const [size, setSize] = useState("lg");
  const [overflowing, setOverflowing] = useState(false);
  const [showOverflow, setShowOverflow] = useState(false);

  const handleOverflowClick = () => {
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
        } else if (React.isValidElement(tool)) {
          return (
            <span className="Tool" key={index}>
              {tool}
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

  const getOverflowedTools = useCallback(() => {
    const toolElements = Array.from(innerContainer.current.childNodes);
    const firstOverflowIdx = findFirstOverflow(toolElements, 64);
    return getTools(size).slice(firstOverflowIdx);
  }, [getTools, size]);

  const handlePopupClosed = useCallback((e) => {
    if (e?.target && !overflowButton.current.contains(e.target)) {
      setShowOverflow(false);
    }
  }, []);

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

  return (
    <ResponsiveContainer
      id={id}
      breakPoints={stops}
      className={cx("Toolbar", className, size, {
        "overflow-open": showOverflow
      })}
      ref={root}
      onResize={setSize}
      style={{ height }}
    >
      <div className="Toolbar-inner" ref={innerContainer}>
        {renderTools()}
      </div>
      {overflowing ? (
        <Overflow onClick={handleOverflowClick} ref={overflowButton} />
      ) : null}
    </ResponsiveContainer>
  );
};

export default Toolbar;
