import React, { useEffect, useRef } from "react";

import "./Icon.css";

const neverRerender = () => true;
const Icon = () => {
  const root = useRef(null);
  useEffect(() => {
    root.current.innerHTML = `
    <svg height="100%" viewBox="0 0 18 18" width="100%">
    <path class="icon-path" d="M16.0385,1.3535a.5.5,0,0,0-.707,0l-3.242,3.242L10.6,3.103A.344.344,0,0,0,10.3525,3a.35.35,0,0,0-.35.35V7.77a.25.25,0,0,0,.2295.2295H14.65a.35.35,0,0,0,.35-.35h0a.34253.34253,0,0,0-.1035-.245l-1.492-1.492,3.242-3.242a.5.5,0,0,0,0-.707Z" />
    <path class="icon-path" d="M7.7705,10H3.35a.35.35,0,0,0-.35.35.34252.34252,0,0,0,.1035.245l1.492,1.492-3.242,3.2445a.5.5,0,0,0,0,.707l.608.608a.5.5,0,0,0,.707,0l3.242-3.242,1.492,1.4925A.344.344,0,0,0,7.65,15,.35.35,0,0,0,8,14.65V10.23A.25.25,0,0,0,7.7705,10Z" />
    </svg>`;
  }, []);

  return <span className="Icon close" ref={root} />;
};

export default React.memo(Icon, neverRerender);
