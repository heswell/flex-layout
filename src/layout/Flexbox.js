import React, { useCallback, useRef, useState } from "react";
import Splitter from "./Splitter";
import useLayout from "./useLayout";
import { Action } from "./layout-action";

import "./Flexbox.css";

// TODO factor this out into utils
const useSizesRef = () => {
  const sizesRef = useRef([]);
  const [, setState] = useState(sizesRef.current);
  const setSizes = useCallback((fn) => {
    sizesRef.current = fn(sizesRef.current);
    setState(sizesRef.current);
  }, []);

  return [sizesRef, setSizes];
};

const Flexbox = function Flexbox(props) {
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const { children, column, style } = props;
  const flexDirection = column ? "column" : "row";
  const [sizesRef, setSizes] = useSizesRef([]);
  const dimension = column ? "height" : "width";
  const { current: styles } = useRef([]);
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
    dispatch({
      type: Action.SPLITTER_RESIZE,
      layoutModel,
      sizes: sizesRef.current
    });
  }, [dispatch, layoutModel, sizesRef]);

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

  const injectSplitters = (list, layoutChild, i, arr) => {
    const child = children[i];
    const { style: styleProp } = child.props;
    const size = sizesRef.current[i];
    const style =
      !styles[i] || styles[i].flexBasis !== size
        ? (styles[i] = {
            ...styleProp,
            ...(size === undefined
              ? undefined
              : { flexBasis: size, flexGrow: 1, flexShrink: 1 })
          })
        : styles[i];

    const dolly = React.cloneElement(child, {
      dispatch,
      key: i,
      layoutModel: layoutChild,
      style
    });
    list.push(dolly);
    // TODO we have to watch out for runtime changes to resizeable
    if (child.props.resizeable && children[i + 1]?.props.resizeable) {
      //TODO these cached splitters trap stale state
      list.push(createSplitter(i));
    }
    return list;
  };

  const elements = layoutModel.children.reduce(injectSplitters, []);
  return (
    <div className="Flexbox" style={{ ...style, flexDirection }} ref={rootRef}>
      {elements}
    </div>
  );
};
Flexbox.displayName = "Flexbox";

export default Flexbox;
