import React from "react";
import { expandFlex, typeOf } from "./utils";

export const getManagedDimension = (style) =>
  style.flexDirection === "column" ? ["height", "width"] : ["width", "height"];

export const getLayoutModel = (
  type,
  { resizeable, style, children, ...props },
  path = "0"
) => {
  debugger;
  if (type === "Flexbox") {
    style = {
      ...style,
      display: "flex",
      flexDirection: props.column ? "column" : "row"
    };
  } else if (style.flex) {
    const { flex, ...otherStyles } = style;
    style = {
      ...otherStyles,
      ...expandFlex(flex)
    };
  }
  return {
    path,
    resizeable,
    style,
    type,
    children: getLayoutModelChildren(children, path)
  };
};

function getLayoutModelChildren(children, path) {
  // TODO don't recurse into children of non-layout
  if (React.isValidElement(children)) {
    return [getLayoutModel(typeOf(children), children.props), `${path}.0`];
    // return [getLayoutModelDeprecated(children)];
  } else if (Array.isArray(children)) {
    return children
      .filter((child) => child)
      .map((child, i) =>
        getLayoutModel(typeOf(child), child.props, `${path}.${i}`)
      );
  }
}

export function resetPath(layoutModel, path) {
  if (layoutModel.path === path) {
    return layoutModel;
  }
  return {
    ...layoutModel,
    path,
    children:
      layoutModel.children &&
      layoutModel.children.map((child, i) => {
        if (!child.path) {
          return child;
        } else {
          return resetPath(child, `${path}.${i}`);
        }
      })
  };
}
