import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { SearchParams } from "../../types/SearchParams";
import { BaseResponse } from "../../types/responseType";
import { BaseEpisodeResponse, Episode } from "../../types/Episode";
import { Movie } from "../../types/Movie";

interface MovieState {
  Response: string;
  Search: Movie[] | Episode[];
  totalResults: string;
}

const initialState: MovieState = {
  Response: "",
  Search: [],
  totalResults: ""
};
export const getMovies = createAsyncThunk("movies/getMovies", async (params: SearchParams) => {
  let endPoint = "";
  if (params.type === "episode") {
    endPoint = `${import.meta.env.VITE_BASE_ENDPOINT}?t=${params.title}&Season=1&apikey=${
      import.meta.env.VITE_API_KEY
    }`;
  } else {
    endPoint = `${import.meta.env.VITE_BASE_ENDPOINT}?s=${params.title}&y=${params.year}&type=${params.type}&page=${
      params.page
    }&apikey=${import.meta.env.VITE_API_KEY}`;
  }
  const { data } = await axios.get<BaseResponse | BaseEpisodeResponse>(endPoint);

  return data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (state, action: PayloadAction<BaseResponse | BaseEpisodeResponse>) => {
      if ("Episodes" in action.payload) {
        state.Response = action.payload.Response;
        state.Search = action.payload.Episodes;
        state.totalResults = action.payload.totalSeasons;
      } else {
        state.Response = action.payload.Response;
        state.Search = action.payload.Search;
        state.totalResults = action.payload.totalResults;
      }
    });
  }
});

export const movieSelector = (state: RootState) => state.movieReducer;
export default movieSlice.reducer;
