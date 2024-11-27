import { Movie } from "./Movie";

export type BaseResponseType = {
  Response: string;
  Search: Movie[];
  Totalresults: string;
};
