import React from "react";
import { uuid } from "@heswell/utils";
import { typeOf } from "./utils";

export const getLayoutModel = (type, { children, id }, path = "0") => {
  return {
    id: id || uuid(),
    path,
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
  if (layoutModel.$path === path) {
    return layoutModel;
  }
  return {
    ...layoutModel,
    $path: path,
    children:
      layoutModel.children &&
      layoutModel.children.map((child, i) => {
        if (!child.$path) {
          return child;
        } else {
          return resetPath(child, `${path}.${i}`);
        }
      })
  };
}
