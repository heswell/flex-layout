import React from "react";
import { uuid } from "@heswell/utils";
import { expandFlex, typeOf } from "./utils";

export const getManagedDimension = (style) =>
  style.flexDirection === "column" ? ["height", "width"] : ["width", "height"];

const theKidHasNoStyle = {};

export const applyLayout = (type, props, dispatch) => {
  if (type === "DraggableLayout") {
    return getLayoutChild(props.children, dispatch, "0", type);
  } else {
    const [extendedProps, children] = getLayoutRootProps(type, props, dispatch);
    return {
      ...extendedProps,
      children
    };
  }
};

const getLayoutRootProps = (type, { children, ...props }, dispatch) => {
  const path = "0";
  return [
    {
      layoutId: uuid(),
      path,
      dispatch,
      ...props,
      style: getStyle(type, props)
    },
    getLayoutChildren(type, children, dispatch, path)
  ];
};

function getLayoutChildren(type, children, dispatch, path = "0") {
  return React.Children.map(children, (child, i) =>
    getLayoutChild(child, dispatch, `${path}.${i}`, type)
  );
}

const getLayoutChild = (child, dispatch, path = "0", parentType = null) => {
  const { children } = child.props;
  const type = typeOf(child);
  const id = uuid();
  return React.cloneElement(
    child,
    {
      id,
      key: id,
      dispatch,
      path,
      style: getStyle(type, child.props, parentType)
    },
    React.Children.map(children, (child, i) =>
      getLayoutChild(child, dispatch, `${path}.${i}`, type)
    )
  );
};

const getStyle = (type, props, parentType) => {
  let { style = theKidHasNoStyle } = props;
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

  return style;
};

export function resetPath(model, path) {
  if (model.props.path === path) {
    return model;
  }
  const children = [];
  // React.Children.map rewrites keys, forEach does not
  React.Children.forEach(model.props.children, (child, i) => {
    if (!child.props.path) {
      children.push(child);
    } else {
      children.push(resetPath(child, `${path}.${i}`));
    }
  });
  return React.cloneElement(model, { path }, children);
}
