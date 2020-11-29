import React from "react";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import Component from "./Component";
import { Tab, TabPanel, Tabstrip } from "./tabs";
import { Toolbar, Tooltray } from "./toolbar";
import { registerComponent } from "./registry/ComponentRegistry";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons";

import "./Tabs.css";

const Tabs = (inputProps) => {
  const [props, dispatch] = useLayout("Tabs", inputProps);
  const {
    enableAddTab,
    id,
    keyBoardActivation = "automatic",
    onTabSelectionChanged,
    style
  } = props;

  const handleTabSelection = (e, nextIdx) => {
    dispatch({ type: Action.SWITCH_TAB, path: props.path, nextIdx });
    if (onTabSelectionChanged) {
      onTabSelectionChanged(nextIdx);
    }
  };

  const handleDeleteTab = (e, tabIndex) => {
    const doomedChild = props.children[tabIndex];
    dispatch({
      type: Action.REMOVE,
      path: doomedChild.props.path
    });
  };

  const handleAddTab = (e, tabIndex) => {
    dispatch({
      type: Action.ADD,
      component: <Component style={{ backgroundColor: "pink" }} />
    });
  };

  function renderContent() {
    const {
      active = 0,
      children: { [active]: child }
    } = props;
    return child;
  }

  const renderTabs = () =>
    props.children.map((child, idx) => (
      <Tab
        ariaControls={`${id}-${idx}-tab`}
        key={idx}
        id={`${id}-${idx}`}
        label={child.props.title}
        deletable={child.props.removable}
      />
    ));

  return (
    <div className="Tabs" style={style} id={id}>
      <Toolbar className="Header" height={36} maxRows={1}>
        <Tabstrip
          enableAddTab={enableAddTab}
          keyBoardActivation={keyBoardActivation}
          onChange={handleTabSelection}
          onAddTab={handleAddTab}
          onDeleteTab={handleDeleteTab}
          value={props.active || 0}
        >
          {renderTabs()}
        </Tabstrip>
        <Tooltray align="right">
          <MinimizeIcon />
          <MaximizeIcon />
          <CloseIcon />
        </Tooltray>
      </Toolbar>
      <TabPanel
        id={`${id}-${props.active || 0}-tab`}
        ariaLabelledBy={`${id}-${props.active || 0}`}
        rootId={id}
      >
        {renderContent()}
      </TabPanel>
    </div>
  );
};
Tabs.displayName = "Tabs";

export default Tabs;

registerComponent("Tabs", Tabs, true);
