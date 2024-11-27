import React, { useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/moviesHook";
import { detailSelector, searchById } from "../../store/movieDetail/detailSlice";

type Props = {};

const Detail = (props: Props) => {
  const { imdbId } = useParams<string>();
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const detailMovie = useAppSelector(detailSelector);
  useEffect(() => {
    if (imdbId) {
      dispatch(searchById(imdbId));
    }
  }, []);
  return (
    <div className="container-xl">
      <div className="row mt-5 p-5 border custom">
        <div className="col-md-4 mb-5">
          <img src={detailMovie.Poster} alt="" />
        </div>
        <div className="col-md-4">
          <div>
            <h3>Name</h3>
            <p>{detailMovie.Title}</p>
          </div>
          <div>
            <h5>Director</h5>
            <p>{detailMovie.Director}</p>
          </div>
          <div>
            <h5>Runtime</h5>
            <p>{detailMovie.Runtime}</p>
          </div>
          <div>
            <h5>Genre</h5>
            <p>{detailMovie.Genre}</p>
          </div>
          <div>
            <h5>Type</h5>
            <p>{detailMovie.Type}</p>
          </div>
          <div>
            <h5>BoxOffice</h5>
            <p>{detailMovie.BoxOffice}</p>
          </div>
          <div>
            <h5>Released</h5>
            <p>{detailMovie.Released}</p>
          </div>
          <div>
            <h5>Ratings</h5>
            {detailMovie.Ratings.map((rating) => (
              <div className="border d-flex flex-column gap-2 mb-1 p-2 rounded">
                <div className="fw-bold rating">{rating.Source}</div>
                <div className="rating">{rating.Value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
