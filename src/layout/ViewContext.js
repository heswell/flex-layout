import React, { useContext } from "react";

const ViewContext = React.createContext({});

export default ViewContext;

export const useViewContext = () => {
  const context = useContext(ViewContext);
  return context;
};

export const useViewAction = () => {
  const { dispatch } = useContext(ViewContext);
  return dispatch;
};
