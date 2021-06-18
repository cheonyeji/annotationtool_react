import React from "react";
import styled from "styled-components";

function CurrentImg(props) {
  return <WorkImg src={props.src} />;
}

const WorkImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  pointer-events: none;
`;

export default CurrentImg;
