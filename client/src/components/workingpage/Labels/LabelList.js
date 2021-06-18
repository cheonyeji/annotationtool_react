import React from "react";
import LabelItems from "./LabelItems";

function LabelList(props) {
  return (
    <ul>
      {props.labels.map((value, index) => (
        <LabelItems
          key={index}
          index={index}
          id={value.label}
          color={value.color}
        />
      ))}
    </ul>
  );
}

export default LabelList;
