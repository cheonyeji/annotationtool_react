import React, { useContext } from "react";
import styled from "styled-components";
import CurrentImg from "../components/workingpage/WorkArea/CurrentImg";
import LabelInputForm from "../components/workingpage/Labels/LabelInputForm";
import LabelList from "../components/workingpage/Labels/LabelList";
import RectList from "../components/workingpage/Rects/RectList";
import WorkList from "../components/workingpage/ThumbnailImgs/WorkList";
import LabelContext from "../store/labelContext";
import DrawCanvas from "../components/workingpage/WorkArea/DrawCanvas";
import WorkInputForm from "../components/workingpage/ThumbnailImgs/WorkInputForm";
import FileContext from "../store/fileContext";
import CurrentContext from "./../store/currentContext";

function WorkingPageTest() {
  const labelCtx = useContext(LabelContext);
  const fileCtx = useContext(FileContext);
  const currentCtx = useContext(CurrentContext);

  return (
    <div>
      <Grid>
        <ThumbnailImgs>
          <WorkInputForm />
          <WorkList srcs={fileCtx.src} names={fileCtx.name} />
        </ThumbnailImgs>
        <WorkArea>
          <CurrentImg src={currentCtx.filesrc} />
          <DrawCanvas name={currentCtx.filename} width="600px" height="600px" />
        </WorkArea>
        <Labels>
          <LabelInputForm />
          <LabelList labels={labelCtx.label} />
        </Labels>
        <Rects>
          <RectList
            tags={currentCtx.rectInfo}
            selected={currentCtx.editLabelIndex}
          />
        </Rects>
      </Grid>
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, minmax(300px, auto));
  gap: 20px;
  padding: 20px;
`;

const ThumbnailImgs = styled.div`
  grid-row: 1/3;
  grid-column: 1/2;
  background-color: #f4f4f2;
`;
const WorkArea = styled.div`
  grid-row: 1/3;
  grid-column: 2/5;
  background-color: #f4f4f2;
  position: relative;
`;
const Labels = styled.div`
  grid-row: 1/2;
  grid-column: 5/6;
  background-color: #f4f4f2;
  padding: 5px;
`;

const Rects = styled.div`
  grid-row: 2/3;
  grid-column: 5/6;
  background-color: #f4f4f2;
`;

export default WorkingPageTest;
