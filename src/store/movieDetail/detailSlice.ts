import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

import { DetailMovie } from "../../types/Detail";

const initialState: DetailMovie = {
  Title: "",
  Year: "",
  Rated: "",
  Released: "",
  Runtime: "",
  Genre: "",
  Director: "",
  Writer: "",
  Actors: "",
  Plot: "",
  Language: "",
  Country: "",
  Awards: "",
  Poster: "",
  Ratings: [],
  Metascore: "",
  imdbRating: "",
  imdbVotes: "",
  imdbID: "",
  Type: "",
  DVD: "",
  BoxOffice: "",
  Production: "",
  Website: "",
  Response: ""
};

export const searchById = createAsyncThunk("movies/detail", async (param: string) => {
  const { data } = await axios.get<DetailMovie>(
    `${import.meta.env.VITE_BASE_ENDPOINT}?i=${param}&apikey=${import.meta.env.VITE_API_KEY}`
  );

  return data;
});

const detailMovieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchById.fulfilled, (state, action: PayloadAction<DetailMovie>) => {
      return action.payload;
    });
  }
});

export const detailSelector = (state: RootState) => state.detailMovieReducer;
export default detailMovieSlice.reducer;
