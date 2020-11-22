import React from "react";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import Tabstrip, { Tab } from "./Tabstrip";
import TabPanel from "./TabPanel";
import { componentFromLayout, isTypeOf } from "./utils";
import { registerComponent } from "./registry/ComponentRegistry";
import { useChildRefs } from "./useChildRefs";

import "./Tabs.css";

var direction = {
  ArrowLeft: -1,
  ArrowUp: -1,
  ArrowRight: 1,
  ArrowDown: 1
};
const Tabs = (props) => {
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const {
    keyBoardActivation = "automatic",
    onTabSelectionChanged,
    style
  } = props;
  const tabRefs = useChildRefs(props.children);

  // Activates any given tab panel
  function activateTab(tabIndex, setFocus = true) {
    if (tabIndex !== layoutModel.active) {
      dispatch({
        type: Action.SWITCH_TAB,
        path: layoutModel.path,
        nextIdx: tabIndex
      });
    }
    if (setFocus) {
      tabRefs[tabIndex].current.focus();
    }
  }

  const vertical = false;

  const handleTabClick = (e, tabIndex) => {
    activateTab(tabIndex, false);
  };

  const handleTabKeyDown = (e, tabIndex) => {
    const key = e.key;
    const manualActivation = keyBoardActivation === "manual";

    switch (key) {
      case "End":
        e.preventDefault();
        if (manualActivation) {
          focusLastTab();
        } else {
          activateTab(tabRefs.length - 1);
        }
        break;
      case "Home":
        e.preventDefault();
        if (manualActivation) {
          focusFirstTab();
        } else {
          activateTab(0);
        }
        break;

      // ArrowKeys are in keydown
      // because we need to prevent page scroll >:)
      case "ArrowLeft":
      case "ArrowRight":
        if (!vertical) {
          e.preventDefault();
          switchTabOnArrowPress(key, tabIndex);
          break;
        }
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (vertical) {
          e.preventDefault();
          switchTabOnArrowPress(key, tabIndex);
          break;
        }
        break;
      default:
    }
  };

  const handleTabKeyUp = (e, tabIndex) => {
    const key = e.key;
    switch (key) {
      case "Delete":
        determineDeletable(tabIndex);
        break;
      case "Enter":
      case "Space":
        activateTab(tabIndex);
        break;
      default:
    }
  };

  // Detect if a tab is deletable
  function determineDeletable(tabIndex) {
    const childLayout = layoutModel.children[tabIndex];
    if (childLayout.removable) {
      dispatch({
        type: Action.REMOVE,
        layoutModel: childLayout
      });
      if (tabIndex - 1 < 0) {
        focusFirstTab();
      } else {
        tabRefs[tabIndex - 1].current.focus();
      }
    }
  }

  function switchTabOnArrowPress(key, tabIndex) {
    const manualActivation = keyBoardActivation === "manual";
    if (direction[key]) {
      if (tabRefs[tabIndex + direction[key]]) {
        if (manualActivation) {
          tabRefs[tabIndex + direction[key]].current.focus();
        } else {
          activateTab(tabIndex + direction[key], true);
        }
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        if (manualActivation) {
          focusLastTab();
        } else {
          activateTab(tabRefs.length - 1);
        }
      } else if (key === "ArrowRight" || key === "ArrowDown") {
        if (manualActivation) {
          focusFirstTab();
        } else {
          activateTab(0);
        }
      }
    }
  }

  // Make a guess
  function focusFirstTab() {
    tabRefs[0].current.focus();
  }

  // Make a guess
  function focusLastTab() {
    tabRefs[tabRefs.length - 1].current.focus();
  }
  const handleTabSelection = (e, nextIdx) => {
    console.log(`handleTabSelection newSelectedIdx=${nextIdx}`);
    dispatch({ type: Action.SWITCH_TAB, path: layoutModel.path, nextIdx });

    if (onTabSelectionChanged) {
      onTabSelectionChanged(nextIdx);
    }
  };
  function renderContent() {
    const {
      active = 0,
      children: { [active]: childLayoutModel }
    } = layoutModel;
    const {
      children: { [active]: propsChild }
    } = props;

    const child = isTypeOf(propsChild, childLayoutModel.type)
      ? propsChild
      : componentFromLayout(childLayoutModel);

    // THis is wasteful when we have already renderedFromLayout
    const dolly = React.cloneElement(child, {
      dispatch,
      key: childLayoutModel.path,
      layoutModel: childLayoutModel,
      style: childLayoutModel.style
    });

    return dolly;
  }

  const renderTabs = () =>
    layoutModel.children.map((child, idx) => (
      <Tab
        key={idx}
        index={idx}
        ref={tabRefs[idx]}
        label={titleFor(child)}
        onClick={handleTabClick}
        onKeyDown={handleTabKeyDown}
        onKeyUp={handleTabKeyUp}
        selected={idx === layoutModel.active}
      />
    ));

  return (
    <div className="Tabs" style={style}>
      <Tabstrip XonChange={handleTabSelection} value={layoutModel.active}>
        {renderTabs()}
      </Tabstrip>
      <TabPanel>{renderContent()}</TabPanel>
    </div>
  );
};
Tabs.displayName = "Tabs";

export default Tabs;

registerComponent("Tabs", Tabs, true);

function titleFor(component) {
  return (component.props && component.props.title) || "Tab X";
}
