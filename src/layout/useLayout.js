import { useRef, useState } from "react";
import layoutReducer from "./layout-reducer";
import { applyLayout } from "./applyLayout"; // TODO allow props to specify layoutRoot
import { Action } from "./layout-action";
/**
 * Root layout node will never receive dispatch. It may receive a layoutModel,
 * in which case UI will be built from model. Only root stores layoutModel in
 * state and only root updates layoutModel. Non-root layout nodes always return
 * layoutModel from props. Root node, if seeded with layoutModel stores this in
 * state and subsequently manages layoutModel in state.
 */
const useLayout = (layoutType, props, customDispatcher) => {
  const isRoot = props.dispatch === undefined;
  const [, setState] = useState(0);

  const dispatchLayoutAction = useRef(
    props.dispatch ||
      ((action) => {
        // A custom dispatcher should return true to indicate that it has handled this action
        if (customDispatcher && customDispatcher(action)) {
          return;
        }
        const nextState = layoutReducer(state.current, action);
        if (nextState !== state) {
          state.current = nextState;
          setState((c) => c + 1);
          if (props.onLayoutChange) {
            // TODO serialize layout
            props.onLayoutChange(nextState);
          }
        }
      })
  );

  // Only the root layout has state here
  const state = useRef(
    isRoot
      ? applyLayout(layoutType, props, dispatchLayoutAction.current)
      : undefined
  );

  return [state.current || props, dispatchLayoutAction.current];
};

export default useLayout;
