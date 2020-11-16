import React, { forwardRef, useCallback, useRef, useState } from "react";
import Splitter from "./Splitter";
import { useChildRefs } from "./useChildRefs";

import "./Flexbox.css";
const Flexbox = forwardRef(function Flexbox({ children, column, style }, ref) {
  const flexDirection = column ? "column" : "row";
  const childRefs = useChildRefs(children);
  const [sizes, setSizes] = useState([]);
  const dimension = column ? "height" : "width";

  const handleDragStart = useCallback(
    (idx) => {
      setSizes(
        childRefs.map((el) => el.current.getBoundingClientRect()[dimension])
      );
    },
    [childRefs, dimension]
  );

  const handleDrag = useCallback(
    (idx, distance) => {
      setSizes((prevSizes) => {
        const newSizes = prevSizes.slice();
        newSizes[idx] += distance;
        newSizes[idx + 1] -= distance;
        return newSizes;
      });
    },
    [setSizes]
  );

  const handleDragEnd = useCallback(() => {
    console.log(`handleDragEnd `);
  }, []);

  const injectSplitters = (list, component, i, arr) => {
    const { style: styleProp } = component.props;
    const size = sizes[i];
    const style = {
      ...styleProp,
      ...(size === undefined
        ? undefined
        : { flexBasis: size, flexGrow: 1, flexShrink: 1 })
    };
    list.push(
      React.cloneElement(component, {
        key: i,
        ref: childRefs[i],
        style
      })
    );
    // TODO memoise these, rather than creaet afresh every render
    if (component.props.resizeable && arr[i + 1]?.props.resizeable) {
      list.push(
        <Splitter
          column={column}
          index={i}
          key={`splitter-${i}`}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        />
      );
    }
    return list;
  };
  return (
    <div className="Flexbox" style={{ ...style, flexDirection }} ref={ref}>
      {Array.isArray(children)
        ? children.reduce(injectSplitters, [])
        : children}
    </div>
  );
});

export default Flexbox;
