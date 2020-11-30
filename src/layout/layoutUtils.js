import React from "react";
import { uuid } from "@heswell/utils";
import { expandFlex, typeOf } from "./utils";
import { ComponentRegistry } from "./registry/ComponentRegistry";

export const getManagedDimension = (style) =>
  style.flexDirection === "column" ? ["height", "width"] : ["width", "height"];

const theKidHasNoStyle = {};

export const applyLayoutProps = (component, dispatch) => {
  return getLayoutChild(component, dispatch, "0");
};

export const applyLayout = (type, props, dispatch) => {
  console.log(`applyLayout ${type}`);
  if (type === "DraggableLayout") {
    if (props.layout) {
      const result = layoutFromJson(props.layout, dispatch, "0");
      console.log({ layoutFromJson: result });
      return result;
    } else {
      return getLayoutChild(props.children, dispatch, "0", type);
    }
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
      flexDirection: props.column ? "column" : "row",
      ...style,
      display: "flex"
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

function layoutFromJson({ type, children, props }, dispatch, path) {
  if (type === "DraggableLayout") {
    return layoutFromJson(children[0], dispatch, "0");
  }

  const componentType = type.match(/^[a-z]/) ? type : ComponentRegistry[type];

  if (componentType === undefined) {
    throw Error(`Unable to create component from JSON, unknown type ${type}`);
  }
  const id = uuid();
  return React.createElement(
    componentType,
    {
      ...props,
      dispatch,
      id,
      key: id,
      path
    },
    children
      ? children.map((child, i) =>
          layoutFromJson(child, dispatch, `${path}.${i}`)
        )
      : undefined
  );
}

export function layoutToJSON(type, props, component) {
  const start = performance.now();
  const result = componentToJson(component);
  const end = performance.now();
  console.log(`toJSON took ${end - start}ms`);

  if (type === "DraggableLayout") {
    return {
      type,
      children: [result]
    };
  }

  return result;
}

function componentToJson(component) {
  const {
    type,
    props: { children, ...props }
  } = component;
  return {
    type: serializeType(type),
    props: serializeProps(props),
    children: React.Children.map(children, componentToJson)
  };
}

function serializeType(elementType) {
  if (typeof elementType === "function" || typeof elementType === "object") {
    return (
      elementType.displayName || elementType.name || elementType?.type.name
    );
  } else if (typeof elementType === "string") {
    return elementType;
  }
}

function serializeProps(props) {
  if (props) {
    // Question, will there ever be a requirement to preserve id value ?
    const { id, path, ...otherProps } = props;
    const result = {};
    for (let [key, value] of Object.entries(otherProps)) {
      if (typeof value === "object") {
        result[key] = serializeProps(value);
      } else if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        result[key] = value;
      }
    }
    return result;
  }
}
