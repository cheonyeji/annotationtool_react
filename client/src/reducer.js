import { ADD, DEL, EDIT } from "./actions";

export const inititalRectState = {
  info: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      const tmp = [...state.info];
      console.log("tmp : ", tmp);
      tmp.push(action.payload);
      console.log("after push, tmp : ", tmp);
      return {
        ...state,
        info: [...tmp],
      };
    case DEL:
      return {
        ...state,
        info: state.info.filter((info) => info.id !== action.payload),
      };
    case EDIT:
      const target = state.info.find((info) => info.id === action.payload);
      return {
        ...state,
      };
    default:
      return;
  }
};

export default reducer;
