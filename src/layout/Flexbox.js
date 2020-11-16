import React, { forwardRef, useCallback, useRef, useState } from "react";
import Splitter from "./Splitter";
import { useChildRefs } from "./useChildRefs";

import "./Flexbox.css";
const Flexbox = React.memo(
  forwardRef(function Flexbox({ children, column, style }, ref) {
    const flexDirection = column ? "column" : "row";
    const childRefs = useChildRefs(children);
    const [sizes, setSizes] = useState([]);
    const dimension = column ? "height" : "width";
    const { current: splitters } = useRef([]);
    const { current: styles } = useRef([]);

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

    const createSplitter = (i) => (
      <Splitter
        column={column}
        index={i}
        key={`splitter-${i}`}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      />
    );

    const injectSplitters = (list, component, i, arr) => {
      const { style: styleProp } = component.props;
      const size = sizes[i];
      const style =
        !styles[i] || styles[i].flexBasis !== size
          ? (styles[i] = {
              ...styleProp,
              ...(size === undefined
                ? undefined
                : { flexBasis: size, flexGrow: 1, flexShrink: 1 })
            })
          : styles[i];

      const dolly = React.cloneElement(component, {
        key: i,
        ref: childRefs[i],
        style
      });
      list.push(dolly);
      // TODO we have to watch out for runtime changes to resizeable
      if (component.props.resizeable && arr[i + 1]?.props.resizeable) {
        list.push(splitters[i] || (splitters[i] = createSplitter(i)));
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
  })
);

Flexbox.displayName = "Flexbox";

export default Flexbox;
