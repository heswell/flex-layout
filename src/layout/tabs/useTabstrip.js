import { useChildRefs } from "../useChildRefs";

var direction = {
  ArrowLeft: -1,
  ArrowUp: -1,
  ArrowRight: 1,
  ArrowDown: 1,
  Home: 0,
  End: 0
};

export default function useTabstrip({
  children,
  keyBoardActivation,
  onChange,
  onDelete,
  orientation,
  value
}) {
  const tabs = useChildRefs(children);
  const manualActivation = keyBoardActivation === "manual";
  const vertical = orientation === "vertical";

  function focusTab(tabIndex) {
    tabs[tabIndex].current.focus();
  }

  function activateTab(e, tabIndex) {
    onChange(e, tabIndex);
    focusTab(tabIndex);
  }

  function switchTabOnKeyPress(e, tabIndex) {
    const { key } = e;
    if (direction[key] !== undefined) {
      e.preventDefault();
      let newTabIndex;
      if (tabs[tabIndex + direction[key]]) {
        newTabIndex = tabIndex + direction[key];
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        newTabIndex = tabs.length - 1;
      } else if (key === "ArrowRight" || key === "ArrowDown") {
        newTabIndex = 0;
      }
      if (manualActivation) {
        focusTab(newTabIndex);
      } else {
        activateTab(e, newTabIndex);
      }
    }
  }

  const handleClick = (e, tabIndex) => {
    if (tabIndex !== value) {
      onChange(e, tabIndex);
      focusTab(tabIndex);
    }
  };

  const handleKeyDown = (e, tabIndex) => {
    const key = e.key;
    switch (key) {
      case "End":
        switchTabOnKeyPress(e, tabs.length - 1);
        break;
      case "Home":
        switchTabOnKeyPress(e, 0);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        if (!vertical) {
          switchTabOnKeyPress(e, tabIndex);
        }
        break;
      case "ArrowUp":
      case "ArrowDown":
        if (vertical) {
          switchTabOnKeyPress(e, tabIndex);
        }
        break;
      default:
    }
  };

  const handleKeyUp = (e, tabIndex) => {
    const key = e.key;
    switch (key) {
      case "Enter":
      case "Space":
        if (tabIndex !== value) {
          onChange(e, tabIndex);
        }
        break;
      default:
    }
  };

  const handleDeleteTab = (e, tabIndex) => {
    onDelete(e, tabIndex);
    if (tabIndex - 1 < 0) {
      focusTab(0);
    } else {
      focusTab(tabIndex - 1);
    }
  };

  return {
    tabProps: {
      onClick: handleClick,
      onDelete: handleDeleteTab,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    },
    tabs
  };
}
