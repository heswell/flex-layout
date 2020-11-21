import React from "react";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import Tabstrip, { Tab } from "./Tabstrip";
import { componentFromLayout, isTypeOf } from "./utils";
import { registerComponent } from "./registry/ComponentRegistry";

import "./Tabs.css";

const Tabs = function Flexbox(props) {
  const [layoutModel, dispatch] = useLayout("Flexbox", props);
  const { onTabSelectionChanged, style } = props;

  const handleTabSelection = (e, nextIdx) => {
    console.log(`handleTabSelection newSelectedIdx=${nextIdx}`);
    dispatch({ type: Action.SWITCH_TAB, path: layoutModel.path, nextIdx });

    if (onTabSelectionChanged) {
      onTabSelectionChanged(nextIdx);
    }
  };
  function renderChildren() {
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
      <Tab key={idx} label={titleFor(child)} />
    ));

  return (
    <div className="Tabs" style={style}>
      <Tabstrip onChange={handleTabSelection} value={layoutModel.active}>
        {renderTabs()}
      </Tabstrip>
      {renderChildren()}
    </div>
  );
};
Tabs.displayName = "Tabs";

export default Tabs;

registerComponent("Tabs", Tabs, true);

function titleFor(component) {
  return (component.props && component.props.title) || "Tab X";
}
