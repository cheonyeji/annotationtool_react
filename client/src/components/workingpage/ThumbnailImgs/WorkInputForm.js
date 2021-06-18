import React, { useContext } from "react";
import styled from "styled-components";
import FileContext from "../../../store/fileContext";

function WorkInputForm() {
  const fileCtx = useContext(FileContext);

  const fileInputHandler = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const imgFile = e.target.files[i];
      const imgUrl = URL.createObjectURL(imgFile);
      fileCtx.addFileName(imgFile.name);
      fileCtx.addFileSrc(imgUrl);
      fileCtx.addFileRect([]);
    }
  };
  return (
    <Form>
      <Label htmlFor="file_input">사진 업로드</Label>
      <Input type="file" multiple id="file_input" onChange={fileInputHandler} />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Label = styled.label`
  display: inline-block;
  padding: 0.5em 0.75em;
  color: white;
  /* line-height: normal; */
  vertical-align: middle;
  background-color: skyblue;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-radius: 0.25em;
  &:hover {
    background-color: orange;
  }
`;

const Input = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export default WorkInputForm;
