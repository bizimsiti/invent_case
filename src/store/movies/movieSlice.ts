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
export const getEpisodes = createAsyncThunk("movies/getEpisodes", async (params: SearchParams) => {
  const { data } = await axios.get<BaseResponse>(
    `${import.meta.env.VITE_BASE_ENDPOINT}?s=${params.title}&y=${params.year}&type=${params.type}&Season=${
      params.season
    }&Episode=${params.episode}&apikey=${import.meta.env.VITE_API_KEY}`
  );
  console.log(data);

  return data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith("movies/"), // Aksiyon tipi 'movies/' ile başlıyorsa
      (state, action: PayloadAction<BaseResponse>) => {
        if (action.type === getMovies.fulfilled.type) {
          state.Response = action.payload.Response;
          state.Search = action.payload.Search;
          state.totalResults = action.payload.totalResults;
        } else if (action.type === getEpisodes.fulfilled.type) {
          state.Response = action.payload.Response;
          state.Search = action.payload.Search;
          state.totalResults = action.payload.totalResults;
        }
      }
    );
  }
});

export const movieSelector = (state: RootState) => state.movieReducer;
export default movieSlice.reducer;
