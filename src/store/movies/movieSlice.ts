import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { SearchParams } from "../../types/SearchParams";
import { BaseResponse } from "../../types/responseType";

const initialState: BaseResponse = {
  Response: "",
  Search: [],
  totalResults: ""
};

export const getMovies = createAsyncThunk("movies/getMovies", async (params: SearchParams) => {
  const { data } = await axios.get<BaseResponse>(
    `${import.meta.env.VITE_BASE_ENDPOINT}?s=${params.title}&y=${params.year}&type=${params.type}&page=${
      params.page
    }&apikey=${import.meta.env.VITE_API_KEY}`
  );

  return data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (state, action: PayloadAction<BaseResponse>) => {
      return action.payload;
    });
  }
});

export const movieSelector = (state: RootState) => state.movieReducer;
export default movieSlice.reducer;
