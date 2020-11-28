import React from "react";
import { typeOf } from "../utils";
import { isContainer } from "../registry/ComponentRegistry";

export var positionValues = {
  north: 1,
  east: 2,
  south: 4,
  west: 8,
  header: 16,
  centre: 32,
  absolute: 64
};

export var Position = Object.freeze({
  North: _position("north"),
  East: _position("east"),
  South: _position("south"),
  West: _position("west"),
  Header: _position("header"),
  Centre: _position("centre"),
  Absolute: _position("absolute")
});

function _position(str) {
  return Object.freeze({
    offset:
      str === "north" || str === "west"
        ? 0
        : str === "south" || str === "east"
        ? 1
        : NaN,
    valueOf: function () {
      return positionValues[str];
    },
    toString: function () {
      return str;
    },
    North: str === "north",
    South: str === "south",
    East: str === "east",
    West: str === "west",
    Header: str === "header",
    Centre: str === "centre",
    NorthOrSouth: str === "north" || str === "south",
    EastOrWest: str === "east" || str === "west",
    NorthOrWest: str === "north" || str === "west",
    SouthOrEast: str === "east" || str === "south",
    Absolute: str === "absolute"
  });
}

var NORTH = Position.North,
  SOUTH = Position.South,
  EAST = Position.East,
  WEST = Position.West,
  HEADER = Position.Header,
  CENTRE = Position.Centre;

export class BoxModel {
  //TODO we should accept initial let,top offsets here
  static measure(model) {
    var measurements = {};
    addMeasurements(model, measurements, 0, 0, 0, 0);
    return measurements;
  }

  static smallestBoxContainingPoint(layout, measurements, x, y) {
    return smallestBoxContainingPoint(layout, measurements, x, y);
  }
}

export function pointPositionWithinRect(x, y, rect) {
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  const posX = x - rect.left;
  const posY = y - rect.top;
  const pctX = posX / width;
  const pctY = posY / height;

  let closeToTheEdge = 0;
  let position;
  let tab;

  const borderZone = 30;

  if (rect.header && containsPoint(rect.header, x, y)) {
    position = HEADER;

    if (rect.tabs) {
      const tabCount = rect.tabs.length;
      const targetTab = rect.tabs.find(
        ({ left, right }) => x >= left && x <= right
      );
      if (targetTab) {
        tab = {
          left: targetTab.left,
          index: rect.tabs.indexOf(targetTab)
        };
      } else {
        const lastTab = rect.tabs[tabCount - 1];
        tab = {
          left: lastTab.right,
          index: tabCount
        };
      }
    } else {
      tab = {
        left: rect.left,
        index: -1
      };
    }
  } else {
    const w = width * 0.4;
    const h = height * 0.4;
    const centerBox = {
      left: rect.left + w,
      top: rect.top + h,
      right: rect.right - w,
      bottom: rect.bottom - h
    };

    if (containsPoint(centerBox, x, y)) {
      position = CENTRE;
    } else {
      const quadrant =
        (pctY < 0.5 ? "north" : "south") + (pctX < 0.5 ? "west" : "east");

      switch (quadrant) {
        case "northwest":
          position = pctX > pctY ? NORTH : WEST;
          break;
        case "northeast":
          position = 1 - pctX > pctY ? NORTH : EAST;
          break;
        case "southeast":
          position = pctX > pctY ? EAST : SOUTH;
          break;
        case "southwest":
          position = 1 - pctX > pctY ? WEST : SOUTH;
          break;
        default:
      }
    }
  }

  // Set closeToTheEdge even when we have already established that we are in a Header.
  // When we use position to walk the containment hierarchy, building the chain of
  // dropTargets, the Header loses significance after the first dropTarget, but
  // closeToTheEdge remains meaningful.
  if (typeof borderZone === "number") {
    if (posX < borderZone) closeToTheEdge += 8;
    if (posX > width - borderZone) closeToTheEdge += 2;
    if (posY < borderZone) closeToTheEdge += 1;
    if (posY > height - borderZone) closeToTheEdge += 4;
  }

  // we might want to also know if we are in the center - this will be used to allow
  // stack default option

  return { position, x, y, pctX, pctY, closeToTheEdge, tab };
}

function addMeasurements(model, measurements, preX, posX, preY, posY) {
  if (React.isValidElement(model)) {
    if (model.props.id && model.props.path) {
      const componentMeasurements = addClientMeasurements(
        model,
        measurements,
        preX,
        posX,
        preY,
        posY
      );

      const type = typeOf(model);
      if (type !== "Tabs" && isContainer(type)) {
        collectChildMeasurements(model, measurements, preX, posX, preY, posY);
      }

      return componentMeasurements;
    }
  }
}

function addClientMeasurements(model, measurements, preX, posX, preY, posY) {
  const { id, path /*, header */ } = model.props;
  const el = document.getElementById(id);
  if (!el) {
    console.log(`No DOM for ${typeOf(model)}`);
  }
  let { top, left, width, height } = el.getBoundingClientRect();

  left = left - preX;
  top = top - preY;

  const right = preX + left + width + posX;

  measurements[path] = {
    top,
    left,
    right,
    bottom: preY + top + height + posY
  };

  // if (header || model.type === "TabbedContainer") {
  //   //TODO don't assume headerheight = 34
  //   measurements[$path].header = { top, left, right, bottom: top + 34 };

  //   if (model.type === "TabbedContainer") {
  //     console.log(`measuring a tabbedContainer ${$path}`);

  //     const start = performance.now();
  //     const tabMeasurements = measureTabs($id);
  //     const end = performance.now();
  //     console.log(`took ${end - start}ms to measure tabs`);
  //     measurements[$path].tabs = tabMeasurements;
  //   }
  // }

  return measurements[path];
}

function collectChildMeasurements(model, measurements, preX, posX, preY, posY) {
  //onsole.log(`   collectChildMeasurements	x:${x}	y:${y}	preX:${preX}	posX:${posX}	preY:${preY}	posY:${posY}`);

  const components = model.props.children.map((child, i, all) => {
    // generate a 'local' splitter adjustment for children adjacent to splitters
    let localPreX = 0;
    let localPosX = 0;
    let localPreY = 0;
    let localPosY = 0;

    return addMeasurements(
      child,
      measurements,
      localPreX,
      localPosX,
      localPreY,
      localPosY
    );
  });

  // var components = model.props.children
  //   .reduce((arr, child, idx, all) => {
  //     if (child.type !== "Splitter" && child.type !== "layout") {
  //       if (model.type === "FlexBox") {
  //         var prev = all[idx - 1];
  //         var next = all[idx + 1];
  //         var n = all.length - 1;

  //         if (model.style.flexDirection === "column") {
  //           localPreX = preX;
  //           localPosX = posX;
  //           localPreY =
  //             idx === 0
  //               ? preY
  //               : isSplitter(prev)
  //               ? prev.computedStyle.height / 2
  //               : 0;
  //           localPosY =
  //             idx === n
  //               ? posY
  //               : isSplitter(next)
  //               ? next.computedStyle.height / 2
  //               : 0;
  //         } else {
  //           localPreX =
  //             idx === 0
  //               ? preX
  //               : isSplitter(prev)
  //               ? prev.computedStyle.width / 2
  //               : 0;
  //           localPosX =
  //             idx === n
  //               ? posX
  //               : isSplitter(next)
  //               ? next.computedStyle.width / 2
  //               : 0;
  //           localPreY = preY;
  //           localPosY = posY;
  //         }
  //       } else {
  //         localPreX = preX;
  //         localPosX = posX;
  //         localPreY = preY;
  //         localPosY = posY;
  //       }

  //     return arr;
  //   }, [])
  //   .filter((c) => c); // the dragging component will return undefined, unrendered tabbed children
  // .sort(byPosition);

  if (components.length) {
    measurements[model.props.path].children = components;
  }
}

function smallestBoxContainingPoint(component, measurements, x, y) {
  const type = typeOf(component);

  var rect = measurements[component.props.path];
  if (!containsPoint(rect, x, y)) return null;

  if (!isContainer(type)) {
    return component;
  }

  if (rect.header && containsPoint(rect.header, x, y)) {
    return component;
  }

  var subLayout;
  var children = component.props.children;

  for (var i = 0; i < children.length; i++) {
    if (type === "Tabs" && component.props.active !== i) {
      continue;
    }
    // eslint-disable-next-line no-cond-assign
    if (
      (subLayout = smallestBoxContainingPoint(children[i], measurements, x, y))
    ) {
      return subLayout;
    }
  }

  return component;
}

function containsPoint(rect, x, y) {
  if (rect) {
    return x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom;
  }
}

function measureTabs(id) {
  // Note the :scope selector is not supported on IE
  return Array.from(
    document.getElementById(id).querySelectorAll(`:scope > .Tabstrip .Tab`)
  )
    .map((tab) => tab.getBoundingClientRect())
    .map(({ left, right }) => ({ left, right }));
}
