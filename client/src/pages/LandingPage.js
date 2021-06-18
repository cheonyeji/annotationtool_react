import React from "react";
import styled from "styled-components";
import uploadImg from "../img/upload.png";
import downloadImg from "../img/download.png";

function LandingPage() {
  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "17px" }}>Welcome!</div>

      <BtnDiv>
        <ImgWrapper>
          <Img
            src={uploadImg}
            alt="upload button"
            onClick={() => console.log("업로드")}
          />
        </ImgWrapper>
        <ImgWrapper>
          <Img
            src={downloadImg}
            alt="download button"
            onClick={() => console.log("다운로드")}
          />
        </ImgWrapper>
      </BtnDiv>
    </div>
  );
}

const BtnDiv = styled.div`
  display: flex;
  gap: 20px;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.div`
  height: 200px;
  width: 200px;
  border: 2px solid #888888;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px #888888;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0.5px 1px 1px #777777);
    transition: filter 0s;
  }
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

export default LandingPage;
