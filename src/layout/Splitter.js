import React, { useCallback, useRef } from "react";
import cx from "classnames";
import "./Splitter.css";

const Splitter = ({ column, index, onDrag, onDragEnd, onDragStart, style }) => {
  const lastPos = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const pos = e[column ? "clientY" : "clientX"];
      const diff = pos - lastPos.current;
      // we seem to get a final value of zero
      if (pos && pos !== lastPos.current) {
        onDrag(index, diff);
      }
      lastPos.current = pos;
    },
    [column, onDrag]
  );

  const handleMouseUp = useCallback(
    (e) => {
      console.log("handleMouseUp");
      window.removeEventListener("mousemove", handleMouseMove, false);
      window.removeEventListener("mouseup", handleMouseUp, false);
    },
    [handleMouseMove]
  );

  const handleMouseDown = useCallback(
    (e) => {
      lastPos.current = column ? e.clientY : e.clientX;
      onDragStart(index);
      window.addEventListener("mousemove", handleMouseMove, false);
      window.addEventListener("mouseup", handleMouseUp, false);
      e.preventDefault();
    },
    [column, handleMouseMove, handleMouseUp, index, onDragStart]
  );

  const className = cx("Splitter", { column });
  return (
    <div className={className} style={style} onMouseDown={handleMouseDown} />
  );
};

export default Splitter;
