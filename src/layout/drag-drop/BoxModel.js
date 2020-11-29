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
    measureRootComponent(model, measurements);
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

function measureRootComponent(model, measurements) {
  if (React.isValidElement(model)) {
    if (model.props.id && model.props.path) {
      const [rect, el] = measureComponentDomElement(model);
      measureComponent(model, rect, el, measurements);
      const type = typeOf(model);
      if (type !== "Tabs" && isContainer(type)) {
        collectChildMeasurements(model, measurements);
      }
    }
  }
}

function measureComponent(model, rect, el, measurements) {
  const { path, header } = model.props;
  measurements[path] = rect;
  const type = typeOf(model);
  if (header || type === "Tabs") {
    const headerEl = el.querySelector(".Header");
    if (headerEl) {
      const { top, left, right, bottom } = headerEl.getBoundingClientRect();
      measurements[path].header = { top, left, right, bottom };
      if (type === "Tabs") {
        measurements[path].tabs = Array.from(
          headerEl.querySelectorAll(".Tabstrip .Tab")
        )
          .map((tab) => tab.getBoundingClientRect())
          .map(({ left, right }) => ({ left, right }));
      }
    }
  }
  return measurements[path];
}

function collectChildMeasurements(
  model,
  measurements,
  preX = 0,
  posX = 0,
  preY = 0,
  posY = 0
) {
  //onsole.log(`   collectChildMeasurements	x:${x}	y:${y}	preX:${preX}	posX:${posX}	preY:${preY}	posY:${posY}`);

  const type = typeOf(model);

  // Collect all the measurements in first pass ...
  const childMeasurements = model.props.children.map(
    measureComponentDomElement
  );

  // ...so that, in the second pass, we can identify gaps ...
  const expandedMeasurements = childMeasurements.map(
    ([rect, el, child], i, all) => {
      // generate a 'local' splitter adjustment for children adjacent to splitters
      let localPreX;
      let localPosX;
      let localPreY;
      let localPosY;
      let gapPre;
      let gapPos;
      const n = all.length - 1;
      if (type === "Flexbox" && model.props.style.flexDirection === "row") {
        gapPre = i === 0 ? 0 : rect.left - all[i - 1][0].right;
        gapPos = i === n ? 0 : all[i + 1][0].left - rect.right;
        localPreX = i === 0 ? preX : gapPre === 0 ? 0 : gapPre / 2;
        localPosX = i === n ? posX : gapPos === 0 ? 0 : gapPos - gapPos / 2;
        rect.left -= localPreX;
        rect.right += localPosX;
        localPreY = preY;
        localPosY = posY;
      } else if (
        type === "Flexbox" &&
        model.props.style.flexDirection === "column"
      ) {
        gapPre = i === 0 ? 0 : rect.top - all[i - 1][0].bottom;
        gapPos = i === n ? 0 : all[i + 1][0].top - rect.bottom;
        // we don't need to divide the leading gap, as half the gap will
        // already have been assigned to the preceeding child in the
        // previous loop iteration.
        localPreY = i === 0 ? preY : gapPre === 0 ? 0 : gapPre;
        localPosY = i === n ? posY : gapPos === 0 ? 0 : gapPos - gapPos / 2;
        rect.top -= localPreY;
        rect.bottom += localPosY;
        localPreX = preX;
        localPosX = posX;
      }

      const componentMeasurements = measureComponent(
        child,
        rect,
        el,
        measurements
      );

      const childType = typeOf(child);
      if (childType !== "Tabs" && isContainer(childType)) {
        collectChildMeasurements(
          child,
          measurements,
          localPreX,
          localPosX,
          localPreY,
          localPosY
        );
      }
      return componentMeasurements;
    }
  );

  if (childMeasurements.length) {
    measurements[model.props.path].children = expandedMeasurements;
  }
}

function measureComponentDomElement(component) {
  const el = document.getElementById(component.props.id);
  if (!el) {
    console.log(`No DOM for ${typeOf(component)}`);
  }
  let { top, left, right, bottom } = el.getBoundingClientRect();
  return [{ top, left, right, bottom }, el, component];
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
