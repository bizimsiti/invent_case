import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SearchParams } from "../../types/SearchParams";

const initialState: SearchParams = {
  page: "1",
  title: "Pokemon",
  type: "",
  year: "",
  episode: "",
  season: ""
};

export const paramsSlice = createSlice({
  name: "params",
  initialState,
  reducers: {
    setParams: (state, action: PayloadAction<SearchParams>) => {
      return { ...state, ...action.payload };
    },
    clearParams: () => {
      return initialState;
    }
  }
});

export const { setParams, clearParams } = paramsSlice.actions;
export const paramsSelector = (state: RootState) => state.paramsReducer;
export default paramsSlice.reducer;
