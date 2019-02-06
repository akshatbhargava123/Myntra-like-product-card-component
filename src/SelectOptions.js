import React from "react";
import { Icon } from "antd";
import "./SelectOptions.css";

const SelectOptions = ({
  defaultSelected,
  options,
  onSelect,
  focusOnHover
}) => {
  const [selected, updateSelected] = React.useState(defaultSelected);
  const [focused, updateFocused] = React.useState(null);
  const selectHandler = i => {
    if (onSelect) onSelect(i);
    updateSelected(i);
  };
  // console.log(defaultSelected, options);
  return options.map((item, i) => (
    <div key={i} style={{ position: "inline", width: "100%" }}>
      <p
        className={selected === i ? "selected" : "modal-items"}
        onClick={() => selectHandler(i)}
        onMouseOver={focusOnHover && (() => updateFocused(i))}
        onMouseOut={focusOnHover && (() => updateFocused(null))}
      >
        {item}
        <span>
          {(selected === i && focused == null) || focused === i ? (
            <Icon
              type="check"
              style={{
                float: "right",
                marginTop: 3
              }}
              className={selected === i ? "selected" : "modal-items"}
            />
          ) : null}
        </span>
      </p>
    </div>
  ));
};

export default SelectOptions;
