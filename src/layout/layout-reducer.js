export const Action = {
  DRAG_START: "drag-start",
  DRAG_DROP: "drag-drop",
  INITIALIZE: "initialize",
  REMOVE: "remove",
  REPLACE: "replace",
  SPLITTER_RESIZE: "splitter-resize",
  SWITCH_TAB: "switch-tab"
};

const MISSING_TYPE = undefined;

const MISSING_HANDLER = (state, action) => {
  console.warn(
    `layoutActionHandlers. No handler for action.type ${action.type}`
  );
  return state;
};

const MISSING_TYPE_HANDLER = (state) => {
  console.warn(
    `layoutActionHandlers. Invalid action:  missing attribute 'type'`
  );
  return state;
};

const handlers = {
  [MISSING_TYPE]: MISSING_TYPE_HANDLER
};

export default (state, action) => {
  console.log(
    `%clayout reducer ${action.type} ${JSON.stringify(state, null, 2)}`,
    "color:blue; font-weight: bold;"
  );
  return (handlers[action.type] || MISSING_HANDLER)(state, action);
};
