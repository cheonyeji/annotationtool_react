import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CurrentContext from "../../../store/currentContext";

function RectItems(props) {
  const currentCtx = useContext(CurrentContext);

  const rectClickHandler = () => {
    currentCtx.editLabel(props.id);
  };

  const deleteSpanClickHandler = () => {
    console.log(props.id);
    currentCtx.removeRectInfo(props.id);
  };

  return (
    <RectItem onClick={rectClickHandler}>
      <InfoDiv>
        <span>{props.id} </span>
        <span>{props.label} </span>
        <span>
          ({props.sx}, {props.sy}, {props.ex}, {props.ey})
        </span>
      </InfoDiv>
      <DeleteSpan onClick={deleteSpanClickHandler}>❌</DeleteSpan>
    </RectItem>
  );
}

const RectItem = styled.li`
  height: 25px;
  border: 1px solid gray;
  margin: 5px;
  border-radius: 2px;
  box-shadow: 1px 1px #888888;
  &:hover {
    box-shadow: 1.5px 1.5px #666666;
  }
  /* 조건문 작동안함; 고쳐야함 */
  background-color: ${(props) =>
    props.selected === props.id ? "lightgray" : "red"};
`;

const InfoDiv = styled.div`
  float: left;
  line-height: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

const DeleteSpan = styled.span`
  float: right;
  cursor: pointer;
  line-height: 20px;
  &:hover {
    text-shadow: 0.5px 0.5px 1px black, 0 0 3px red;
  }
`;
export default RectItems;
