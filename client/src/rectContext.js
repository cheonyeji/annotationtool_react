import React, { useState, useContext, useReducer } from "react";
import reducer, { inititalRectState } from "./reducer";

const RectInfoContext = React.createContext();

const RectInfoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalRectState);
  return (
    <RectInfoContext.Provider value={{ state, dispatch }}>
      {children}
    </RectInfoContext.Provider>
  );
};

export const useRectInfo = () => {
  const { state } = useContext(RectInfoContext);
  return state;
};

export const useDispatch = () => {
  const { dispatch } = useContext(RectInfoContext);
  return dispatch;
};

export default RectInfoContextProvider;
