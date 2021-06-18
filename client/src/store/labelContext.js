// 라벨 정보 저장

import { createContext, useState } from "react";

const LabelContext = createContext({
  label: [],
  tags: [],
  totalLabelNum: 0,
  addLabel: (newLabel) => {},
  removeLabel: (labelId) => {},
  addTag: (tagInfo, labelIndex) => {},
  findIndex: (inputLabel) => {},
});

export const LabelContextProvider = (props) => {
  const [userLabels, setUserLabels] = useState([]);
  const [tagDatas, setTagDatas] = useState([]);

  const addLabelHandler = (newLabel) => {
    var randomColor = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    setUserLabels((prevUserLabels) => {
      if (prevUserLabels.find((data) => data.label === newLabel)) {
        return prevUserLabels;
      } else {
        return [...prevUserLabels, { label: newLabel, color: randomColor }];
      }
    });
  };

  const removeLabelHandler = (deleteLabel) => {
    setUserLabels((prevUserLabels) => {
      return prevUserLabels.filter((data) => data.label !== deleteLabel);
    });
  };

  const deleteSameTag = (deleteTagInfo) => {
    setTagDatas((prevTagDatas) => {
      let tmp = prevTagDatas;
      for (let index of Object.keys(tmp)) {
        var data = tmp[index];
        if (data === undefined) {
          continue;
        }
        if (
          data.tagInfo.name === deleteTagInfo.name &&
          data.tagInfo.rectIndex === deleteTagInfo.rectIndex
        ) {
          delete tmp[index];
        }
      }
      return tmp;
    });
  };
  const filter = () => {
    setTagDatas((prevTagDatas) => prevTagDatas.filter((el) => el != null));
  };

  const addTagHandler = (tagInfo, labelIndex) => {
    deleteSameTag(tagInfo);
    filter();
    setTagDatas((prevTagDatas) => {
      return [...prevTagDatas, { labelIndex: labelIndex, tagInfo: tagInfo }];
    });
  };

  const findIndexHandler = (inputLabel) => {
    return userLabels.findIndex((data) => data.label === inputLabel);
  };

  const context = {
    label: userLabels,
    tags: tagDatas,
    totalLabelNum: userLabels.length,
    addLabel: addLabelHandler,
    removeLabel: removeLabelHandler,
    addTag: addTagHandler,
    findIndex: findIndexHandler,
  };

  return (
    <LabelContext.Provider value={context}>
      {props.children}
    </LabelContext.Provider>
  );
};

export default LabelContext;
