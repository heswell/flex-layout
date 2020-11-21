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

function removeChild(model, action) {
  return _removeChild(model, action.layoutModel);
}

function _removeChild(model, child) {
  const { idx, finalStep } = nextStep(model.path, child.path);
  let children = model.children.slice();

  if (finalStep) {
    children.splice(idx, 1);

    if (model.type === "TabbedContainer" && model.active === idx) {
      const nextActive = 0;
      model.active = nextActive;
      // children[nextActive].layoutStyle.display = Display.Flex;
    }

    if (children.length === 1 && model.type.match(/Flexbox|TabbedContainer/)) {
      return unwrap(model, children[0]);
    }
  } else {
    children[idx] = _removeChild(children[idx], child);
  }

  children = children.map((child, i) => resetPath(child, `${model.path}.${i}`));

  return { ...model, children };
}

function unwrap(layoutModel, child) {
  const {
    path,
    drag,
    type,
    style: { flexBasis, flexGrow, flexShrink, width, height },
    layoutStyle: {
      flexBasis: layoutBasis,
      flexGrow: layoutGrow,
      flexShrink: layoutShrink
    }
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
      style: { [dim]: size, ...style },
      layoutStyle: { [dim]: layoutSize, ...layoutStyle }
    } = unwrappedChild;
    unwrappedChild = {
      ...unwrappedChild,
      drag,
      style: {
        ...style,
        flexGrow,
        flexShrink,
        flexBasis
      },
      layoutStyle: {
        ...layoutStyle,
        layoutGrow,
        layoutShrink,
        layoutBasis
      }
    };
  }
  return unwrappedChild;
}
