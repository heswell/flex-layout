import React, { useRef } from "react";
import cx from "classnames";
import { Tabstrip, Tab } from "./Tabs";
import View from "./View";
import useLayout from "./useLayout";
import { Action } from "./layout-action";
import { componentFromLayout, isTypeOf } from "./utils";
import { isContainer, registerComponent } from "./registry/ComponentRegistry";

export default function Tabs(props) {
  const [layoutModel, dispatch] = useLayout("Tabs", props);
  const { onTabSelectionChanged } = props;

  const el = useRef(null);

  const onMouseDown = (evt, model = layoutModel) => {
    evt.stopPropagation();
    const dragRect = el.current.getBoundingClientRect();
    dispatch({ type: Action.DRAG_START, evt, layoutModel: model, dragRect });
  };

  const handleTabSelection = (e, nextIdx) => {
    console.log(`handleTabSelection newSelectedIdx=${nextIdx}`);
    dispatch({ type: Action.SWITCH_TAB, path: layoutModel.$path, nextIdx });

    if (onTabSelectionChanged) {
      onTabSelectionChanged(nextIdx);
    }
  };

  function closeTab(idx) {
    dispatch({ type: Action.REMOVE, layoutModel: layoutModel.children[idx] });
  }

  const tabs = () =>
    layoutModel.children.map((child, idx) => (
      <Tab
        key={idx}
        label={titleFor(child)}
        onMouseDown={(e) => onMouseDown(e, child)}
        onClose={closeTab}
      />
    ));

  const { $id, computedStyle, active } = layoutModel;
  const className = cx("Tabs", props.className);
  return (
    <div id={$id} ref={el} className={className} style={computedStyle}>
      <Tabstrip
        className="header"
        // we used to store a 'ref' here
        // TODO use layoutModel.header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 26
        }}
        draggable={true} // To be investigated
        value={active}
        onMouseDown={onMouseDown}
        onChange={handleTabSelection}
      >
        {tabs()}
      </Tabstrip>
      {renderChildren()}
    </div>
  );

  function renderChildren() {
    const {
      active = 0,
      children: { [active]: childLayoutModel }
    } = layoutModel;
    const {
      children: { [active]: propsChild }
    } = props;

    // essentiallybthe same logic as flexbox - look to reuse
    const child = isTypeOf(propsChild, childLayoutModel.type)
      ? propsChild
      : componentFromLayout(childLayoutModel);

    const layoutProps = {
      key: childLayoutModel.$id,
      layoutModel: childLayoutModel,
      dispatch
    };

    if (isContainer(child)) {
      return React.cloneElement(child, { ...layoutProps });
    } else {
      return (
        <View {...child.props} {...layoutProps}>
          {child}
        </View>
      );
    }
  }
}

registerComponent("Tas", Tabs, true);

function titleFor(component) {
  return (component.props && component.props.title) || "Tab X";
}
