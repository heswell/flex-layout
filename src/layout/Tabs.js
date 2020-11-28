import React from "react";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import { Tab, TabPanel, Tabstrip } from "./tabs";
import { Toolbar, Tooltray } from "./toolbar";
import { registerComponent } from "./registry/ComponentRegistry";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons";

import "./Tabs.css";

const Tabs = (inputProps) => {
  const [props, dispatch] = useLayout("Tabs", inputProps);
  const {
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

  const handleTabDelete = (e, tabIndex) => {
    // dispatch({
    //   type: Action.REMOVE,
    //   layoutModel: layoutModel.children[tabIndex]
    // });
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
      <Toolbar height={36} maxRows={1}>
        <Tabstrip
          keyBoardActivation={keyBoardActivation}
          onChange={handleTabSelection}
          onDelete={handleTabDelete}
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
