import { useSelector } from "react-redux";
import "./style.scss";

import { RootState } from "../../store/store";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Image } from "lucide-react";
import MovieForm from "../../components/MovieForm";

import { Movie } from "../../types/Movie";

const Dashboard = () => {
  const navigate = useNavigate();

  const { Search: movies, totalResults } = useSelector((state: RootState) => state.movieReducer);

  const goDetail = (e: React.MouseEvent<HTMLTableRowElement>) => {
    navigate(`detail/${e.currentTarget.dataset.imdbid}`);
  };

  const isMovie = (movie: any): movie is Movie => "Poster" in movie;

  return (
    <div className="border mt-5 p-4 container-xxl text-center">
      <div className="row">
        <div className="col-md-12">
          <MovieForm />
        </div>
        <div className="col-md-12">
          {movies ? (
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
                      <td>{isMovie(movie) ? movie.Year : movie.Released}</td>
                      <td className="d-none d-sm-table-cell">{isMovie(movie) ? movie.Type : "N/A"}</td>
                      <td>{movie.imdbID}</td>
                      <td className="d-none d-sm-table-cell">
                        {isMovie(movie) && movie.Poster !== "N/A" ? (
                          <img width={50} src={movie.Poster} alt={movie.Title} />
                        ) : (
                          <Image />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
              <div className="col">
                <Pagination totalResults={totalResults} />
              </div>
            </table>
          ) : (
            <div className="container mt-3">
              <h3>Arama sonucu bulunamadı.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
