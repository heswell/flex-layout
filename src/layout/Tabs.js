import React from "react";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import { Tab, TabPanel, Tabstrip } from "./tabs";
import { Toolbar, Tooltray } from "./toolbar";
import { componentFromLayout, isTypeOf } from "./utils";
import { registerComponent } from "./registry/ComponentRegistry";
import { useId } from "./utils";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "./icons";

import "./Tabs.css";

const Tabs = (props) => {
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const id = useId(props.id);
  const {
    keyBoardActivation = "automatic",
    onTabSelectionChanged,
    style
  } = props;

  const handleTabSelection = (e, nextIdx) => {
    dispatch({ type: Action.SWITCH_TAB, path: layoutModel.path, nextIdx });

    if (onTabSelectionChanged) {
      onTabSelectionChanged(nextIdx);
    }
  };

  const handleTabDelete = (e, tabIndex) => {
    dispatch({
      type: Action.REMOVE,
      layoutModel: layoutModel.children[tabIndex]
    });
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
        ariaControls={`${id}-${idx}-tab`}
        key={idx}
        id={`${id}-${idx}`}
        label={child.title}
        deletable={child.removable}
      />
    ));

  return (
    <div className="Tabs" style={style}>
      <Toolbar height={36} maxRows={1}>
        <Tabstrip
          keyBoardActivation={keyBoardActivation}
          onChange={handleTabSelection}
          onDelete={handleTabDelete}
          value={layoutModel.active}
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
        id={`${id}-${layoutModel.active}-tab`}
        ariaLabelledBy={`${id}-${layoutModel.active}`}
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
