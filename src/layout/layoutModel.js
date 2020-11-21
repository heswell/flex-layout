import React from "react";
import { expandFlex, typeOf } from "./utils";

export const getManagedDimension = (style) =>
  style.flexDirection === "column" ? ["height", "width"] : ["width", "height"];

export const getLayoutModel = (
  type,
  { resizeable, style, children, ...props },
  path = "0",
  parentType = null
) => {
  if (type === "Flexbox") {
    style = {
      ...style,
      display: "flex",
      flexDirection: props.column ? "column" : "row"
    };
  }

  if (style.flex) {
    const { flex, ...otherStyles } = style;
    style = {
      ...otherStyles,
      ...expandFlex(flex)
    };
  } else if (parentType === "Tabs") {
    style = {
      ...style,
      ...expandFlex(1)
    };
  }

  return {
    path,
    resizeable,
    style,
    type,
    children: getLayoutModelChildren(type, children, path)
  };
};

function getLayoutModelChildren(type, children, path) {
  // TODO don't recurse into children of non-layout
  if (React.isValidElement(children)) {
    return [
      getLayoutModel(typeOf(children), children.props, `${path}.0`, type)
    ];
    // return [getLayoutModelDeprecated(children)];
  } else if (Array.isArray(children)) {
    return children
      .filter((child) => child)
      .map((child, i) =>
        getLayoutModel(typeOf(child), child.props, `${path}.${i}`, type)
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
