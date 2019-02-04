import React from "react";
import { Icon } from "antd";
import "./SelectOptions.css";

const SelectOptions = ({ defaultSelected, options, onSelect }) => {
  const [selected, updateSelected] = React.useState(defaultSelected);
  const selectHandler = i => {
    if (onSelect) onSelect(i);
    updateSelected(i);
  };
  return options.map((item, i) => (
    <div key={i} style={{ position: "inline", width: 100 }}>
      <p
        className={selected === i ? "selected" : "modal-items"}
        onClick={() => selectHandler(i)}
      >
        {item}
        <span>
          {selected === i ? (
            <Icon
              type="check"
              style={{ float: "right", marginTop: 3 }}
              className={selected === i ? "selected" : "modal-items"}
            />
          ) : null}
        </span>
      </p>
    </div>
  ));
};

export default SelectOptions;
