import { useSelector } from "react-redux";
import "./style.scss";
import { searchById } from "../../store/movies/movieSlice";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/moviesHook";
import { RootState } from "../../store/store";
import { SearchParams } from "../../types/SearchParams";
type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("Pokemon");
  const [params, setParams] = useState<SearchParams>({
    title: "pokemon",
    type: "movie",
    year: ""
  });
  const movies = useSelector((state: RootState) => state.movieReducer);

  useEffect(() => {
    dispatch(searchById(params));
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("search") as string;
    const type = formData.get("type") as string;
    const year = formData.get("year-search") as string;
    const searchParams: SearchParams = {
      title,
      type,
      year
    };
    dispatch(searchById(searchParams));
  };
  return (
    <div className="border mt-5 p-4 container-xxl text-center">
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSearch} className="d-flex col-md-8 gap-3">
            <div className="">
              {" "}
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
              {" "}
              <select name="type" className="form-select shadow-none text-center" aria-label="">
                <option value="">All</option>
                <option value="series">Tv Show</option>
                <option value="episode">Tv Show Episode</option>
              </select>
            </div>
            <div className="">
              {" "}
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
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
