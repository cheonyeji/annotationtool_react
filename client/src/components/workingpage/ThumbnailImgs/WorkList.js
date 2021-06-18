import React from "react";
import WorkItems from "./WorkItems";

function WorkList(props) {
  return (
    <ul>
      {props.names.map((name, idx) => (
        <WorkItems key={idx} name={name} src={props.srcs[idx]} />
      ))}
    </ul>
  );
}

export default WorkList;
