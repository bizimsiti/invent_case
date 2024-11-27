import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { Movie } from "../../types/Movie";
import { SearchParams } from "../../types/SearchParams";
import { BaseResponseType } from "../../types/responseType";

const initialState: Movie[] = [];

export const searchById = createAsyncThunk("movies/searchById", async (params: SearchParams) => {
  const { data } = await axios.get<BaseResponseType>(
    `${import.meta.env.VITE_BASE_ENDPOINT}?s=${params.title}&y=${params.year}&t=${params.type}&apikey=${
      import.meta.env.VITE_API_KEY
    }`
  );

  return data.Search;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchById.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      return action.payload;
    });
  }
});

export const movieSelector = (state: RootState) => state.movieReducer;
export default movieSlice.reducer;
