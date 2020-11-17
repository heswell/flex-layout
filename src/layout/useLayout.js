import { useState } from "react";
import layoutReducer from "./layout-reducer";
import { getLayoutModel } from "./layoutModel";

const useLayout = (layoutType, props) => {
  const [layoutModel, setLayoutModel] = useState(
    props.layoutModel || getLayoutModel(layoutType, props)
  );

  const dispatch =
    props.dispatch ||
    ((action) => setLayoutModel((state) => layoutReducer(state, action)));

  return [layoutModel, dispatch];
};

export default useLayout;
