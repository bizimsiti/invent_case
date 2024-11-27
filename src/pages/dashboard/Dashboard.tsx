import { useSelector } from "react-redux";
import "./style.scss";
import { getMovies } from "../../store/movies/movieSlice";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../hooks/moviesHook";
import { RootState } from "../../store/store";
import { SearchParams } from "../../types/SearchParams";
import Pagination from "../../components/Pagination";
type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("pokemon");
  const [params, setParams] = useState<SearchParams>({
    title,
    type: "movie",
    year: "",
    page: "1"
  });
  const { Search: movies, Response, totalResults } = useSelector((state: RootState) => state.movieReducer);

  useEffect(() => {
    dispatch(getMovies(params));
  }, [params]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("search") as string;
    const type = formData.get("type") as string;
    const year = formData.get("year-search") as string;
    const searchParams: SearchParams = {
      title,
      type,
      year,
      page: "1"
    };
    setParams(searchParams);
    dispatch(getMovies(searchParams));
  };

  return (
    <div className="border mt-5 p-4 container-xxl text-center">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSearch} className="d-flex col-md-8 gap-3">
            <div className="">
              <input
                type="text"
                className="form-control shadow-none"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="search"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="">
              <select name="type" className="form-select shadow-none text-center" aria-label="">
                <option value="">All</option>
                <option value="series">Tv Show</option>
                <option value="episode">Tv Show Episode</option>
              </select>
            </div>
            <div className="">
              <input
                type="text"
                className="form-control shadow-none"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                name="year-search"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
        <div className="col-md-12">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" className="">
                  Name
                </th>
                <th scope="col">Release Date</th>
                <th scope="col">Genre</th>

                <th scope="col" className="d-none d-sm-table-cell">
                  Imdb ID
                </th>
              </tr>
            </thead>
            <tbody>
              {movies &&
                movies.map((movie) => (
                  <tr>
                    <th scope="row">{movie.Title}</th>
                    <td>{movie.Year}</td>
                    <td>{movie.Type}</td>
                    <td className="d-none d-sm-table-cell">{movie.imdbID}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col">
          <Pagination totalResults={totalResults} params={params} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
