import { Action } from "./layout-action";
import { followPath, nextStep } from "./utils";
import { resetPath } from "./layoutModel";

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
  [Action.REMOVE]: removeChild,
  [Action.SWITCH_TAB]: switchTab,
  [MISSING_TYPE]: MISSING_TYPE_HANDLER
};

export default (state, action) => {
  console.log(
    `%clayout reducer ${action.type} `,
    "color:blue; font-weight: bold;"
  );
  return (handlers[action.type] || MISSING_HANDLER)(state, action);
};

function switchTab(state, { path, nextIdx }) {
  var target = followPath(state, path);
  const manualLayout = {
    ...target,
    active: nextIdx,
    children: target.children.map((child, i) => {
      // TODO do we even need to do this ?
      if (i === target.active) {
        return {
          ...child
        };
      } else if (i === nextIdx) {
        return {
          ...child
        };
      } else {
        return child;
      }
    })
  };
  return swapChild(state, target, manualLayout);
}

function splitterResize(state, { layoutModel, sizes }) {
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

function removeChild(model, action) {
  return _removeChild(model, action.layoutModel);
}

function _removeChild(model, child) {
  const { idx, finalStep } = nextStep(model.path, child.path);
  let children = model.children.slice();
  let { active, path, type } = model;

  if (finalStep) {
    children.splice(idx, 1);

    if (type === "Tabs" && active >= idx) {
      active = Math.max(0, active - 1);
    }

    if (children.length === 1 && type.match(/Flexbox|Tabs/)) {
      return unwrap(model, children[0]);
    }
  } else {
    children[idx] = _removeChild(children[idx], child);
  }

  children = children.map((child, i) => resetPath(child, `${path}.${i}`));

  return { ...model, active, children };
}

// Untested
function unwrap(layoutModel, child) {
  const {
    path,
    drag,
    type,
    style: { flexBasis, flexGrow, flexShrink, width, height }
  } = layoutModel;

  let unwrappedChild = resetPath(child, path);
  if (path === "0") {
    unwrappedChild = {
      ...unwrappedChild,
      drag,
      //TODO get this bit right, do we need top, left as well ?
      style: {
        ...child.style,
        width,
        height
      },
      computedStyle: layoutModel.computedStyle
    };
  } else if (type === "Flexbox") {
    const dim =
      layoutModel.style.flexDirection === "column" ? "height" : "width";
    const {
      style: { [dim]: size, ...style }
    } = unwrappedChild;
    unwrappedChild = {
      ...unwrappedChild,
      drag,
      style: {
        ...style,
        flexGrow,
        flexShrink,
        flexBasis
      }
    };
  }
  return unwrappedChild;
}
