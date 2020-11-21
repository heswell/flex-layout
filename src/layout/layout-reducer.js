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

  const result = swapChild(state, target, manualLayout);
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

function swapChild(model, child, replacement) {
  const { idx, finalStep } = nextStep(model.path, child.path);
  const children = model.children.slice();
  if (finalStep) {
    children[idx] = replacement;
  } else {
    children[idx] = swapChild(children[idx], child, replacement);
  }
  return { ...model, children };
}
