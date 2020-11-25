import { useEffect, useRef, useState } from "react";
import layoutReducer from "./layout-reducer";
import { getLayoutModel } from "./layoutModel"; // TODO allow props to specify layoutRoot
import { Action } from "./layout-action";
/**
 * Root layout node will never receive dispatch. It may receive a layoutModel,
 * in which case UI will be built from model. Only root stores layoutModel in
 * state and only root updates layoutModel. Non-root layout nodes always return
 * layoutModel from props. Root node, if seeded with layoutModel stores this in
 * state and subsequently manages layoutModel in state.
 */
const useLayout = (layoutType, props, isDraggableRoot) => {
  const isRoot = props.dispatch === undefined;
  const [state, setState] = useState(
    isRoot ? props.layoutModel || getLayoutModel(layoutType, props) : undefined
  );

  useEffect(() => {
    if (isRoot && props.layoutModel) {
      setState(props.layoutModel);
    }
  }, [props.layoutModel, isRoot]);

  const dispatchLayoutAction = useRef(
    props.dispatch ||
      ((action) => {
        // Ignore a drag start event, if root is not configured as draggable
        if (!(!isDraggableRoot && action.type === Action.DRAG_START)) {
          const nextLayoutModel = layoutReducer(state, action);
          if (nextLayoutModel !== state) {
            setState(nextLayoutModel);
            if (props.onLayoutChange) {
              props.onLayoutChange(nextLayoutModel);
            }
          }
        }
      })
  );

  return [state || props.layoutModel, dispatchLayoutAction.current];
};

export default useLayout;
