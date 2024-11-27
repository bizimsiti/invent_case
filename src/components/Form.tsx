import { FormEvent, useEffect, useState } from "react";
import { SearchParams } from "../types/SearchParams";
import { useAppDispatch, useAppSelector } from "../hooks/moviesHook";
import { getMovies, getEpisodes } from "../store/movies/movieSlice";
import { paramsSelector, setParams } from "../store/searchParams/paramsSlice";

const Form = () => {
  const dispatch = useAppDispatch();
  const params = useAppSelector(paramsSelector);

  const [title, setTitle] = useState<string>("pokemon");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("search") as string;
    const type = formData.get("type") as string;
    const year = formData.get("year-search") as string;
    const season = formData.get("season") as string;
    const episode = formData.get("Episode") as string;

    const searchParams: SearchParams = {
      title,
      type,
      year,
      page: "1",
      episode,
      season
    };
    dispatch(setParams(searchParams));
    dispatch(getMovies(searchParams));
    setTitle("");
  };
  useEffect(() => {
    dispatch(getMovies(params));
  }, [params]);

  return (
    <form onSubmit={handleSearch} className="d-flex col-md-8 gap-3">
      <div className="">
        <input
          type="text"
          className="form-control shadow-none"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          placeholder="search by name"
          name="search"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <select name="type" className="form-select shadow-none text-center" aria-label="">
          <option value="">All</option>
          <option value="series">Tv Show</option>
          <option value="episode">Tv Show Episode</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          className="form-control shadow-none"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          name="year-search"
          placeholder="search by year"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default Form;
