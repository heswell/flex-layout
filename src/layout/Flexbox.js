import React, { useCallback, useRef, useState } from "react";
import Splitter from "./Splitter";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
// import { componentFromLayout, isTypeOf } from "./utils";
import { registerComponent } from "./registry/ComponentRegistry";

import "./Flexbox.css";

// TODO factor this out into utils
const useSizesRef = () => {
  const sizesRef = useRef([]);
  const [, setState] = useState(sizesRef.current);
  const setSizes = useCallback((fn) => {
    sizesRef.current = fn(sizesRef.current);
    setState(sizesRef.current);
  }, []);

  const clear = () => (sizesRef.current = []);

  return [sizesRef, setSizes, clear];
};

const Flexbox = function Flexbox(inputProps) {
  const [props, dispatch] = useLayout("Flexbox", inputProps);
  const { children, column, id, path, style } = props;
  const [sizesRef, setSizes, clearSizes] = useSizesRef([]);
  const dimension = column ? "height" : "width";
  const rootRef = useRef(null);

  const handleDragStart = useCallback(() => {
    setSizes(() =>
      Array.from(rootRef.current.childNodes)
        .filter((el) => !el.classList.contains("Splitter"))
        .map((el) => Math.round(el.getBoundingClientRect()[dimension]))
    );
  }, [rootRef, dimension, setSizes]);

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
    const sizes = sizesRef.current;
    clearSizes();
    dispatch({
      type: Action.SPLITTER_RESIZE,
      path,
      sizes
    });
  }, [clearSizes, dispatch, path, sizesRef]);

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

  const injectSplitters = (list, child, i, arr) => {
    const { flexBasis, [dimension]: layoutSize } = child.props.style;
    const draggedSize = sizesRef.current[i];
    const cloneChild =
      draggedSize !== undefined &&
      draggedSize !== flexBasis &&
      draggedSize !== layoutSize;

    if (cloneChild) {
      const dolly = React.cloneElement(child, {
        style: {
          ...child.props.style,
          flexBasis: draggedSize
        }
      });
      list.push(dolly);
    } else {
      list.push(child);
    }
    // TODO we have to watch out for runtime changes to resizeable
    if (child.props.resizeable && arr[i + 1]?.props.resizeable) {
      list.push(createSplitter(i));
    }
    return list;
  };
  return (
    <div className="Flexbox" id={id} ref={rootRef} style={style}>
      {children.reduce(injectSplitters, [])}
    </div>
  );
};
Flexbox.displayName = "Flexbox";

export default Flexbox;

registerComponent("Flexbox", Flexbox, true);
