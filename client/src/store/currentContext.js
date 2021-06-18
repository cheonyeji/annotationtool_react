// 현재 작업 중인 사진에 대한 정보 저장
import { createContext, useState } from "react";

const CurrentContext = createContext({
  filename: "",
  filesrc: "",
  rectInfo: [],
  editLabelIndex: -1,
  updateName: (newName) => {},
  updateSrc: (newSrc) => {},
  updateRectInfo: (newObj) => {},
  editLabel: (RectIndex) => {},
  editRectInfo: (newLabel, index) => {},
  removeRectInfo: (deleteRectIndex) => {},
  removeLabel: (deleteLabel) => {},
  setRectInfo: (existingInfo) => {},
  resetRectInfo: () => {},
});

export const CurrentContextProvider = (props) => {
  const [name, setName] = useState("");
  const [src, setSrc] = useState("");
  const [rectInfos, setRectInfos] = useState([]);
  const [selectedRectIdx, setSelectedRectIdx] = useState(-1);

  const updateNameHandler = (newName) => {
    setName(newName);
  };
  const updateSrcHandler = (newSrc) => {
    setSrc(newSrc);
  };
  const updateRectInfoHandler = (newObj) => {
    setRectInfos((prevRectInfos) => {
      return [...prevRectInfos, newObj];
    });
  };
  const editLabelHandler = (RectIndex) => {
    setSelectedRectIdx(RectIndex);
  };

  const editRectInfoHandler = (newLabel, index, newColor) => {
    setRectInfos((prevRectInfos) => {
      let tmpRect = prevRectInfos;
      prevRectInfos.map((i, v) => {
        if (i.id === index) {
          tmpRect[v] = { ...tmpRect[v], label: newLabel, color: newColor };
        }
      });
      return [...tmpRect];
    });
  };

  const removeRectInfoHandler = (deleteRectIndex) => {
    setRectInfos((prevRectInfos) => {
      return prevRectInfos.filter((data) => data.id !== deleteRectIndex);
    });
  };

  const removeLabelHandler = (deleteLabel) => {
    setRectInfos((prevRectInfos) => {
      let tmp = prevRectInfos;
      tmp.map((i, v) => {
        if (i.label === deleteLabel) {
          tmp[v] = { ...tmp[v], label: "none", color: "#888888" };
        }
      });
      return [...tmp];
    });
  };
  const setRectInfoHandler = (existingInfo) => setRectInfos(existingInfo);

  const resetRectInfoHandler = () => setRectInfos([]);

  const context = {
    filename: name,
    filesrc: src,
    rectInfo: rectInfos,
    editLabelIndex: selectedRectIdx,
    updateName: updateNameHandler,
    updateSrc: updateSrcHandler,
    updateRectInfo: updateRectInfoHandler,
    editLabel: editLabelHandler,
    editRectInfo: editRectInfoHandler,
    removeRectInfo: removeRectInfoHandler,
    removeLabel: removeLabelHandler,
    setRectInfo: setRectInfoHandler,
    resetRectInfo: resetRectInfoHandler,
  };

  return (
    <CurrentContext.Provider value={context}>
      {props.children}
    </CurrentContext.Provider>
  );
};

export default CurrentContext;
