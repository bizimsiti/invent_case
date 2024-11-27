import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/moviesHook";
import { getMovies } from "../store/movies/movieSlice";
import { SearchParams } from "../types/SearchParams";

type Props = {
  totalResults: string;
  params: SearchParams;
};

const Pagination = ({ totalResults, params }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const totalPage = Math.ceil(Number(totalResults) / 10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialPages = [];
    for (let i = 1; i <= Math.min(10, totalPage); i++) {
      initialPages.push(i);
    }
    if (totalPage > 10) {
      initialPages.push("...");
      initialPages.push(totalPage); // Son sayfa eklenir
    }
    setVisiblePages(initialPages as number[]);
    setCurrentPage(1);
  }, [totalPage]);

  const handleClickDot = (page: any) => {
    setCurrentPage(page);
    if (page === "...") {
      console.log(visiblePages);
    }
    console.log(params, currentPage);

    dispatch(getMovies({ ...params, page: currentPage.toString() }));
  };
  const handleClick = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
    console.log(params);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li className="page-item">
          <a
            id="previous"
            onClick={() => handleClick("prev")}
            className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
            href="#"
          >
            {currentPage === 1 ? "First Page" : "Previous"}
          </a>
        </li>
        {visiblePages.map((page) => (
          <li role="button" className={`page-item ${currentPage === page ? "active" : ""}`}>
            <a className="page-link" onClick={() => handleClickDot(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            id="next"
            onClick={() => handleClick("next")}
            className={`page-link ${currentPage === totalPage ? "disabled" : ""}`}
            href="#"
          >
            {currentPage === totalPage ? "Last Page" : "Next"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
