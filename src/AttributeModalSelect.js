import React from "react";
import { Modal } from "antd";
import SelectOptions from "./SelectOptions";

const AttributeModalSelect = ({
  isOpen,
  onValueSelect,
  options,
  focusOnHover
}) => {
  const [visible, updateVisible] = React.useState(isOpen);
  React.useEffect(() => {
    updateVisible(isOpen);
  });
  const onSelectHandler = i => {
    if (onValueSelect) onValueSelect(i);
  };
  return (
    <Modal
      title="CHANGE SIZE"
      visible={visible}
      footer={null}
      width="max-content"
      closable={false}
      bodyStyle={{ overflowY: "scroll", height: 230 }}
    >
      <SelectOptions
        defaultSelected={1}
        options={options}
        onSelect={onSelectHandler}
        focusOnHover={focusOnHover}
      />
    </Modal>
  );
};
export default AttributeModalSelect;
