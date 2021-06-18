import React, { useContext } from "react";
import styled from "styled-components";
import CurrentContext from "../../../store/currentContext";
import FileContext from "../../../store/fileContext";

function WorkItems(props) {
  const currentCtx = useContext(CurrentContext);
  const fileCtx = useContext(FileContext);

  const selectHandler = () => {
    currentCtx.updateName(props.name);
    currentCtx.updateSrc(props.src);
    currentCtx.resetRectInfo();
    const index = fileCtx.findIndex(props.name);
    fileCtx.returnFileRect(index).map((value) => {
      return currentCtx.updateRectInfo(value);
    });
  };

  return (
    <li onClick={selectHandler}>
      <ItemButton>
        <ThumbImg src={props.src}></ThumbImg>
        <FileName>{props.name}</FileName>
      </ItemButton>
    </li>
  );
}

const ItemButton = styled.div`
  display: flex;
  margin: 5px;
  box-shadow: 1px 1px #888888;
  &:hover {
    box-shadow: 1.5px 1.5px #666666;
  }
`;

const FileName = styled.p`
  text-align: center;
  width: 80%;
`;

const ThumbImg = styled.img`
  width: 50px;
  height: 50px;
  pointer-events: none;
`;

export default WorkItems;
