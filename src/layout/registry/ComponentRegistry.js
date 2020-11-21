const _containers = {};

export const ComponentRegistry = {};

export function isContainer(className) {
  return _containers[className] === true;
}

export const isRegistered = (className) => !!ComponentRegistry[className];

export function registerComponent(className, component, isContainer) {
  ComponentRegistry[className] = component;

  if (isContainer) {
    _containers[className] = true;
  }
}

// const EMPTY_OBJECT = {};

// export function getDefaultProps({ type }) {
//   if (typeof type === "function" && type.prototype.isReactComponent) {
//     return type.defaultProps;
//   }
//   return EMPTY_OBJECT;
// }
