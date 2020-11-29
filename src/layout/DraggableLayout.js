import React, { useCallback, useEffect, useRef, useState } from "react";
import { Action } from "./layout-action";
import { Draggable, DragContainer } from "./drag-drop/Draggable";
import useLayout from "./useLayout";

const EMPTY_OBJECT = {};

// We need to add props to restrict drag behaviour to, for example, popups only
const DraggableLayout = (inputProps) => {
  const customDispatcher = useCallback((action) => {
    if (action.type === Action.DRAG_START) {
      const path = action.path;
      if (DragContainer.paths.length === 0) {
        DragContainer.register("0");
      } else if (path !== "*") {
        const paths = DragContainer.paths;
        if (!paths.some((p) => path.startsWith(p))) {
          return;
        }
      }
      const { evt, ...options } = action;
      Draggable.handleMousedown(
        evt,
        prepareToDrag.bind(null, options),
        options.instructions
      );
      return true;
    } else {
      return false;
    }
  }, []);

  const [root, dispatchLayoutAction] = useLayout(
    "DraggableLayout",
    inputProps,
    customDispatcher
  );

  useEffect(() => {
    console.log(
      `%cDraggable layout mounted ${root.props.id}`,
      "color:brown;font-weight: bold;"
    );
    return () =>
      console.log(
        `%c>>>Draggable layout unmounted ${root.props.id}`,
        "color:brown;font-weight: bold;"
      );
  }, []);

  console.log(`[DraggableLayout]:render root key ${root.props.id}`);

  const [_, setDrag] = useState(-1.0);
  const dragOperation = useRef(null);

  useEffect(() => {
    if (root.props.drag) {
      const {
        dragRect,
        dragPos,
        dragPath,
        instructions,
        draggable
      } = root.props.drag;
      dragStart(draggable, dragRect, dragPos, dragPath, instructions);
      setDrag(0.0);
    }
  }, [root.props.drag, dragStart]);

  const prepareToDrag = useCallback(
    ({ path, dragRect, instructions = EMPTY_OBJECT }, evt, xDiff, yDiff) => {
      const dragPos = { x: evt.clientX, y: evt.clientY };
      // we need to wait for this to take effect before we continue with the drag
      dispatchLayoutAction({
        type: Action.DRAG_STARTED,
        path,
        dragRect,
        dragPos,
        instructions
      });
    },
    [dispatchLayoutAction]
  );

  const dragStart = useCallback(
    (draggable, dragRect, dragPos, dragPath, instructions) => {
      // TODO are we using instructions ?
      var { top, left } = dragRect;
      // note: by passing null as dragContainer path, we are relying on registered DragContainer. How do we allow an
      // override for this ?
      const dragTransform = Draggable.initDrag(root, null, dragRect, dragPos, {
        drag: handleDrag,
        drop: handleDrop
      });
      // the dragTransform should happen here

      // see surface for draggedIcon
      // var { $path, computedStyle, ...rest } = draggedLayoutModel;

      // const componentToBeDragged = {
      //   ...rest,
      //   computedStyle: {
      //     ...computedStyle,
      //     ...dragTransform,
      //     left,
      //     top
      //   }
      // };

      dragOperation.current = {
        draggable,
        dragRect,
        dragTransform,
        position: { left, top }
      };
    },
    [root]
  );

  function handleDrag(x, y) {
    const { position } = dragOperation.current;
    const left = typeof x === "number" ? x : position.left;
    const top = typeof y === "number" ? y : position.top;
    if (left !== position.left || top !== position.top) {
      dragOperation.current.position.left = left;
      dragOperation.current.position.top = top;
      setDrag(parseFloat(`${left}.${top}`));
    }
  }

  function handleDrop(dropTarget) {
    dispatchLayoutAction({
      type: Action.DRAG_DROP,
      dropTarget,
      targetPosition: dragOperation.current.position
    });
    dragOperation.current = null;
    setDrag(-1.0);
  }

  let dragComponent = undefined;

  if (dragOperation.current) {
    const {
      draggable,
      dragRect,
      dragTransform,
      position
    } = dragOperation.current;

    // const dragContainerLayoutModel = {
    //   ...rest,
    //   computedStyle: {
    //     ...computedRest,
    //     transform,
    //     transformOrigin,
    //     ...position
    //   }
    // };

    // const draggedItemLayoutModel = {
    //   ...rest,
    //   computedStyle: {
    //     ...computedRest,
    //     left: 0,
    //     top: 0
    //   }
    // };
    // pass dispatch via context
    // const layoutItemProps = {
    //   title: dragContainerLayoutModel.props.title,
    //   layoutModel: dragContainerLayoutModel,
    //   dispatch: dispatchLayoutAction
    // };

    // dragComponent = (
    //   <View className="dragging" {...layoutItemProps}>
    //     {componentFromLayout(draggedItemLayoutModel)}
    //   </View>
    // );
    // dragComponent = draggable;
    dragComponent = (
      <div
        style={{
          backgroundColor: "black",
          position: "absolute",
          width: dragRect.width,
          height: dragRect.height,
          ...position,
          ...dragTransform
        }}
      />
    );
  }

  return (
    <>
      {root}
      {dragComponent}
    </>
  );
};

export default DraggableLayout;
