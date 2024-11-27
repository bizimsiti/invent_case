import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movies/movieSlice";
import detailMovieReducer from "./movieDetail/detailSlice";
export const store = configureStore({
  reducer: {
    movieReducer,
    detailMovieReducer
  }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
