import { Movie } from "./Movie";

export type BaseResponse = {
  Response: string;
  Search: Movie[];
  totalResults: string;
};
