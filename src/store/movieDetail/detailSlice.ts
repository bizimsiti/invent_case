import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { SearchParams } from "../../types/SearchParams";
import { BaseResponse } from "../../types/responseType";
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

// https://www.omdbapi.com/?i=tt1201607&apikey=2fad3060

export const searchById = createAsyncThunk("movies/detail", async (param: string) => {
  const { data } = await axios.get<DetailMovie>(
    `${import.meta.env.VITE_BASE_ENDPOINT}?i=${param}&apikey=${import.meta.env.VITE_API_KEY}`
  );
  console.log(data);

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
