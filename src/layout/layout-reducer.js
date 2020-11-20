import { Action } from "./layout-action";
import { followPath, nextStep } from "./utils";
import { getManagedDimension } from "./layoutModel";

const MISSING_TYPE = undefined;

const MISSING_HANDLER = (state, action) => {
  console.warn(
    `layoutActionHandlers. No handler for action.type ${action.type}`
  );
  return state;
};

const MISSING_TYPE_HANDLER = (state) => {
  console.warn(
    `layoutActionHandlers. Invalid action:  missing attribute 'type'`
  );
  return state;
};

const handlers = {
  [Action.SPLITTER_RESIZE]: splitterResize,
  [MISSING_TYPE]: MISSING_TYPE_HANDLER
};

export default (state, action) => {
  console.log(
    `%clayout reducer ${action.type} `,
    "color:blue; font-weight: bold;"
  );
  return (handlers[action.type] || MISSING_HANDLER)(state, action);
};

function splitterResize(state, { layoutModel, sizes }) {
  console.log(`%csplitterResize ${sizes}`, "color: brown;font-weight: bold;");
  // is target always the same as state ?
  const target = followPath(state, layoutModel.path);
  const manualLayout = {
    ...layoutModel,
    children: layoutModel.children.map((child, i) => {
      // if (child.type === "Splitter") {
      //   return child;
      // } else {
      const dim = target.style.flexDirection === "column" ? "height" : "width";
      const {
        style: { [dim]: size, flexBasis }
      } = child;
      if (size === sizes[i] || flexBasis === sizes[i]) {
        return child;
      } else {
        return {
          ...child,
          style: applySize(child.style, dim, sizes[i])
        };
      }
      // }
    })
  };

  const result = replaceChild(state, target, manualLayout);
  return result;
}

function applySize(style, dim, newSize) {
  const hasSize = typeof style[dim] === "number";
  const { flexShrink = 1, flexGrow = 1 } = style;
  return {
    ...style,
    [dim]: hasSize ? newSize : "auto",
    flexBasis: hasSize ? "auto" : newSize,
    flexShrink,
    flexGrow
  };
}

function replaceChild(model, child, replacement) {
  const { idx, finalStep } = nextStep(model.path, child.path);
  const children = model.children.slice();
  if (finalStep) {
    // can replacement evcer be an array - there used to be provision for that here
    let newChild = replacement;
    const {
      style: { left: _1, top: _2, flex: _3, width, height, ...style }
    } = newChild;
    if (
      newChild.resizeable &&
      newChild.layoutStyle.flexBasis !== "auto" &&
      (width !== undefined || height !== undefined)
    ) {
      if (model.type === "FlexBox") {
        const [dim] = getManagedDimension(model.style);
        const { flexGrow, flexShrink, [dim]: size } = child.layoutStyle;
        const flexStyle = {
          flexBasis: "auto",
          flexGrow,
          flexShrink,
          [dim]: size
        };
        const {
          layoutStyle: { width: _w, height: _h, ...layoutStyle }
        } = newChild;
        newChild = {
          ...newChild,
          path: child.path, // if replacement might be a layout, need to cascade path change
          style: {
            ...style,
            ...flexStyle
          },
          layoutStyle: {
            ...layoutStyle,
            ...flexStyle
          }
        };
      } else {
        const { width, height } = child.layoutStyle; // what else do we need to copy across
        newChild = {
          ...newChild,
          path: child.path, // if replacement might be a layout, need to cascade path change
          style: {
            ...style,
            width,
            height
          },
          layoutStyle: child.layoutStyle // need to take just the 'outerLayoutStyles' from target, retaining innerLayoutSTyles
        };
      }
    }

    children[idx] = newChild;
  } else {
    children[idx] = replaceChild(children[idx], child, replacement);
  }
  return { ...model, children };
}
