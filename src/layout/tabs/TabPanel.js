import React from "react";

import "./TabPanel.css";

const TabPanel = ({ children }) => {
  return (
    <div className="TabPanel" role="tabpanel">
      {children}
    </div>
  );
};

export default TabPanel;
