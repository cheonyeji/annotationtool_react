import React, { useContext } from "react";
import styled from "styled-components";
import CurrentContext from "../../../store/currentContext";
import LabelContext from "../../../store/labelContext";
import FileContext from "../../../store/fileContext";

function LabelItems(props) {
  const currentCtx = useContext(CurrentContext);
  const labelCtx = useContext(LabelContext);
  const fileCtx = useContext(FileContext);

  const labelClickHandler = () => {
    // selectedLabel에 해당하는 currentCtx의 Label 값 변경
    currentCtx.editRectInfo(props.id, currentCtx.editLabelIndex, props.color);
    // console.log(props.index, currentCtx.filename, currentCtx.editLabelIndex);
    if (currentCtx.editLabelIndex !== -1) {
      labelCtx.addTag(
        { name: currentCtx.filename, rectIndex: currentCtx.editLabelIndex },
        props.index
      );
      // console.log("맨 마지막 상태는 반영 안되서 보여짐", labelCtx.tags);
    }
    currentCtx.editLabel(-1);
  };

  const deleteSpanClickHandler = () => {
    labelCtx.removeLabel(props.id);
    currentCtx.removeLabel(props.id);
    fileCtx.removeLabel(props.id);
  };

  return (
    <LabelItem>
      <ColorPallet color={props.color} />
      <LabelSpan onClick={labelClickHandler}>{props.id}</LabelSpan>
      <DeleteSpan onClick={deleteSpanClickHandler}>❌</DeleteSpan>
    </LabelItem>
  );
}

const LabelItem = styled.li`
  height: 25px;
  border: 1px solid gray;
  border-radius: 2px;
  margin-top: 5px;
  box-shadow: 1px 1px #888888;
  &:hover {
    box-shadow: 1.5px 1.5px #666666;
  }
`;

const ColorPallet = styled.div`
  width: 5%;
  height: 100%;
  background-color: ${(props) => props.color};
  float: left;
  margin-right: 5px;
`;

const LabelSpan = styled.span`
  line-height: 25px;
  width: 90%;
  cursor: pointer;
  &:hover {
    text-shadow: 0.5px 0.5px 0.2px black;
  }
`;

const DeleteSpan = styled.span`
  float: right;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    text-shadow: 0.5px 0.5px 1px black, 0 0 3px red;
  }
`;
export default LabelItems;
