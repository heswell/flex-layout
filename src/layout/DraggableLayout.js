import React, { useCallback, useEffect, useRef, useState } from "react";
import { Action } from "./layout-action";
import { componentFromLayout, typeOf } from "./utils";
import { Draggable, DragContainer } from "./drag-drop/Draggable";
import View from "./View";
import useLayout from "./useLayout";

const EMPTY_OBJECT = {};

// We need to add props to restrict drag behaviour to, for example, popups only
const DraggableLayout = ({
  children: childrenProp,
  layoutModel: inheritedLayout
}) => {
  const {
    props: { onLayoutModel, ...props }
  } = childrenProp;
  const [layoutModel, dispatchLayoutAction] = useLayout(
    typeOf(childrenProp),
    props,
    true
  );
  const [_, setDrag] = useState(-1.0);
  const dragOperation = useRef(null);

  useEffect(() => {
    if (layoutModel !== null) {
      if (layoutModel.drag) {
        const { dragRect, dragPos, component, instructions } = layoutModel.drag;
        dragStart(dragRect, dragPos, component, instructions);
        setDrag(0.0);
      } else if (onLayoutModel) {
        onLayoutModel(layoutModel, dispatchLayoutAction);
      }
    }
  }, [layoutModel]);

  const dispatch = useCallback(
    (action) => {
      if (action.type === "drag-start") {
        const path = action.layoutModel.path;
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
      } else {
        dispatchLayoutAction(action);
      }
    },
    [layoutModel]
  );

  function prepareToDrag(
    { layoutModel, dragRect, instructions = EMPTY_OBJECT },
    evt,
    xDiff,
    yDiff
  ) {
    console.log(`prepare to Drag ${xDiff}, ${yDiff}`);
    const dragPos = { x: evt.clientX, y: evt.clientY };
    // we need to wait for this to take effect before we continue with the drag
    console.log(`onDragStart actual drag detected`);
    dispatchLayoutAction({
      type: Action.DRAG_START,
      layoutModel,
      dragRect,
      dragPos,
      instructions
    });
  }

  function dragStart(dragRect, dragPos, draggedLayoutModel, instructions) {
    console.log(`DragStart`, dragRect);
    /*    
    // TODO are we using instructions ?
    var { top, left } = dragRect;
    // note: by passing null as dragContainer path, we are relying on registered DragContainer. How do we allow an
    // override for this ?
    const dragTransform = Draggable.initDrag(
      layoutModel,
      null,
      dragRect,
      dragPos,
      {
        drag: handleDrag,
        drop: handleDrop
      }
    );

    // the dragTransform should happen here

    // see surface for draggedIcon
    var { $path, computedStyle, ...rest } = draggedLayoutModel;

    const componentToBeDragged = {
      ...rest,
      computedStyle: {
        ...computedStyle,
        ...dragTransform,
        left,
        top
      }
    };

    dragOperation.current = {
      component: componentToBeDragged,
      position: { left, top }
    };
    */
  }

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
    dispatch({
      type: Action.DRAG_DROP,
      dropTarget,
      targetPosition: dragOperation.current.position
    });
    dragOperation.current = null;
    setDrag(-1.0);
  }

  if (layoutModel === null) {
    return null;
  }

  if (
    inheritedLayout &&
    inheritedLayout.computedStyle.top !== layoutModel.computedStyle.top
  ) {
    // hack as stretch does not currently assign top correctly in absolute style
    layoutModel.computedStyle.top = inheritedLayout.computedStyle.top;
  }

  const rootProps = {
    ...props,
    layoutModel,
    dispatch,
    key: layoutModel ? layoutModel.$id : null
  };
  const layoutRoot =
    typeOf(childrenProp) === layoutModel.type
      ? childrenProp
      : componentFromLayout(layoutModel);

  const layoutRootComponent = React.cloneElement(layoutRoot, rootProps);

  let dragComponent = undefined;

  if (dragOperation.current) {
    const {
      component: {
        computedStyle: { transform, transformOrigin, ...computedRest },
        ...rest
      },
      position
    } = dragOperation.current;
    const dragContainerLayoutModel = {
      ...rest,
      computedStyle: {
        ...computedRest,
        transform,
        transformOrigin,
        ...position
      }
    };

    const draggedItemLayoutModel = {
      ...rest,
      computedStyle: {
        ...computedRest,
        left: 0,
        top: 0
      }
    };
    // pass dispatch via context
    const layoutItemProps = {
      title: dragContainerLayoutModel.props.title,
      layoutModel: dragContainerLayoutModel,
      dispatch: dispatchLayoutAction
    };

    dragComponent = (
      <View className="dragging" {...layoutItemProps}>
        {componentFromLayout(draggedItemLayoutModel)}
      </View>
    );
  }

  return (
    <>
      {layoutRootComponent}
      {dragComponent}
    </>
  );
};

export default DraggableLayout;
