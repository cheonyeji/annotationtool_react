// 유저가 작업할 용도로 업로드한 이미지 정보 저장

import { createContext, useState } from "react";

const FileContext = createContext({
  src: [],
  name: [],
  rect: [],
  totalImgNum: 0,
  addFileSrc: (newSrc) => {},
  addFileName: (newName) => {},
  addFileRect: (newRect) => {},
  modifyFileRect: (newRect, index) => {},
  removeLabel: (deleteLabel) => {},
  returnFileRect: (index) => {},
  findIndex: (inputName) => {},
});

export const FileContextProvider = (props) => {
  const [fileSrcs, setFileSrcs] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileRects, setFileRects] = useState([]);

  const addFileSrcHandler = (newSrc) => {
    setFileSrcs((prevFileSrcs) => [...prevFileSrcs, newSrc]);
  };

  const addFileNameHandler = (newName) => {
    setFileNames((prevFileNames) => [...prevFileNames, newName]);
  };

  const addFileRectHandler = (newRect) => {
    setFileRects((prevFileRects) => [...prevFileRects, newRect]);
  };

  const modifyFileRectHandler = (newRect, index) => {
    setFileRects((prevFileRects) => {
      // 여기에서 index번째 요소에 접근하여서 해당 값 수정한 다음, 다시 넣기
      let tmpRect = prevFileRects;
      tmpRect[index] = [];
      tmpRect[index] = newRect;
      return [...tmpRect];
    });
  };

  const removeLabelHandler = (deleteLabel) => {
    setFileRects((prevFileRects) => {
      let tmp = prevFileRects;
      for (let index of Object.keys(tmp)) {
        var data = tmp[index];
        data.map((i, v) => {
          if (i.label === deleteLabel) {
            data[v] = { ...data[v], label: "none", color: "#888888" };
          }
        });
      }
      return [...tmp];
    });
  };

  const returnFileRectHandler = (index) => {
    return fileRects[index];
  };

  const findIndexHandler = (inputName) => {
    return fileNames.findIndex((filename) => filename === inputName);
  };

  const context = {
    src: fileSrcs,
    name: fileNames,
    rect: fileRects,
    totalImgNum: fileNames.length,
    addFileSrc: addFileSrcHandler,
    addFileName: addFileNameHandler,
    addFileRect: addFileRectHandler,
    modifyFileRect: modifyFileRectHandler,
    removeLabel: removeLabelHandler,
    returnFileRect: returnFileRectHandler,
    findIndex: findIndexHandler,
  };

  return (
    <FileContext.Provider value={context}>
      {props.children}
    </FileContext.Provider>
  );
};

export default FileContext;
