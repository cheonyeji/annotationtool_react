import React from "react";
import RectItems from "./RectItems";

function RectList(props) {
  return (
    <ul>
      {props.tags.map((tag) => (
        <RectItems
          id={tag.id}
          key={tag.id}
          sx={tag.sx}
          sy={tag.sy}
          ex={tag.ex}
          ey={tag.ey}
          label={tag.label}
          selected={props.selected}
        />
      ))}
    </ul>
  );
}

export default RectList;
