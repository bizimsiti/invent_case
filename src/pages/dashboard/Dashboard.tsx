import { useSelector } from "react-redux";
import "./style.scss";
import { getMovies } from "../../store/movies/movieSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/moviesHook";
import { RootState } from "../../store/store";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Image } from "lucide-react";
import Form from "../../components/Form";
import { paramsSelector } from "../../store/searchParams/paramsSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useAppSelector(paramsSelector);

  const { Search: movies, totalResults } = useSelector((state: RootState) => state.movieReducer);

  useEffect(() => {
    dispatch(getMovies(params));
  }, [params]);

  const goDetail = (e: React.MouseEvent<HTMLTableRowElement>) => {
    navigate(`detail/${e.currentTarget.dataset.imdbid}`);
  };
  return (
    <div className="border mt-5 p-4 container-xxl text-center">
      <div className="row">
        <div className="col-md-12">
          <Form />
        </div>
        <div className="col-md-12">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" className="">
                  Name
                </th>
                <th scope="col">Release Date</th>
                <th className="d-none d-sm-table-cell" scope="col">
                  Genre
                </th>
                <th scope="col">Imdb ID</th>
                <th scope="col" className="d-none d-sm-table-cell">
                  Poster
                </th>
              </tr>
            </thead>
            <tbody>
              {movies &&
                movies.map((movie) => (
                  <tr role="button" data-imdbid={movie.imdbID} onClick={(e) => goDetail(e)}>
                    <th scope="row">{movie.Title}</th>
                    <td>{movie.Year}</td>
                    <td className="d-none d-sm-table-cell">{movie.Type}</td>
                    <td>{movie.imdbID}</td>
                    <td className="d-none d-sm-table-cell">
                      {movie.Poster === "N/A" ? <Image /> : <img width={50} src={movie.Poster} alt="" />}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col">
          <Pagination totalResults={totalResults} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
