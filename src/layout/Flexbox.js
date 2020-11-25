import React, { useCallback, useRef, useState } from "react";
import Splitter from "./Splitter";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import { componentFromLayout, isTypeOf } from "./utils";
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

const Flexbox = function Flexbox(props) {
  const { children, style } = props;
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const [sizesRef, setSizes, clearSizes] = useSizesRef([]);
  const isColumn = layoutModel.style.flexDirection === "column";
  const dimension = isColumn ? "height" : "width";
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
      layoutModel,
      sizes
    });
  }, [dispatch, layoutModel, clearSizes, sizesRef]);

  const createSplitter = (i) => (
    <Splitter
      column={isColumn}
      index={i}
      key={`splitter-${i}`}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    />
  );

  const injectSplitters = (list, layoutChild, i, arr) => {
    const child = isTypeOf(children[i], layoutChild.type)
      ? children[i]
      : componentFromLayout(layoutChild);

    const { flexBasis, [dimension]: layoutSize } = layoutChild.style;
    const draggedSize = sizesRef.current[i];
    const preferLayout =
      draggedSize === undefined ||
      draggedSize === flexBasis ||
      draggedSize === layoutSize;

    const style = preferLayout
      ? layoutChild.style
      : {
          ...layoutChild.style,
          flexBasis: draggedSize
        };

    const dolly = React.cloneElement(child, {
      dispatch,
      key: i,
      layoutModel: layoutChild,
      style
    });
    list.push(dolly);
    // TODO we have to watch out for runtime changes to resizeable
    if (layoutChild.resizeable && arr[i + 1]?.resizeable) {
      list.push(createSplitter(i));
    }
    return list;
  };

  return (
    <div className="Flexbox" style={style} ref={rootRef}>
      {layoutModel.children.reduce(injectSplitters, [])}
    </div>
  );
};
Flexbox.displayName = "Flexbox";

export default Flexbox;

registerComponent("Flexbox", Flexbox, true);
