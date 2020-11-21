import React from "react";
import cx from "classnames";

import "./Tabstrip.css";
const noop = () => {};
export const Tab = ({ children, selected, onClick, index, label }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(e, index);
  };
  return (
    <div className={cx("Tab", { selected })} onClick={handleClick}>
      {label}
    </div>
  );
};

const Tabstrip = ({
  children,
  style,
  closeButton,
  onClose,
  onChange,
  value = 0
}) => {
  const tabs = children.map((child, index) => {
    const selected = value === index;
    return React.cloneElement(child, {
      index,
      selected,
      onClick: selected ? noop : onChange
    });
  });

  return (
    <div className={cx("Tabstrip")} style={style}>
      <div className="tabstrip-inner-sleeve">
        <ul className="tabstrip-inner">{tabs}</ul>
      </div>
      {closeButton ? <button onClick={onClose}>X</button> : null}
    </div>
  );
};

export default Tabstrip;
