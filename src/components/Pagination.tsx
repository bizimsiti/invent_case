import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/moviesHook";
import { getMovies } from "../store/movies/movieSlice";
import { SearchParams } from "../types/SearchParams";
import { paramsSelector } from "../store/searchParams/paramsSlice";

type Props = {
  totalResults: string;
};

const Pagination = ({ totalResults }: Props) => {
  const params = useAppSelector(paramsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const totalPage = Math.ceil(Number(totalResults) / 10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= totalPage; i++) {
      arr.push(i);
      if (i === 10) {
        arr.push("...");
        arr.push(totalPage);
        break;
      }
    }
    setVisiblePages(arr as number[]);
    setCurrentPage(1);
  }, [totalPage]);

  useEffect(() => {
    dispatch(getMovies({ ...params, page: currentPage.toString() }));
  }, [currentPage]);

  const handleClickDot = (page: any) => {
    setCurrentPage(page);
    if (page === "...") {
      setCurrentPage(11);
    }
    console.log(params, currentPage);
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
      <ul className="pagination pagination-sm justify-content-end">
        <li className="page-item active me-3">
          <a id="previous" className={`page-link `}>
            {currentPage}
          </a>
        </li>
        <li className="page-item">
          <a
            role="button"
            id="previous"
            onClick={() => handleClick("prev")}
            className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
          >
            {currentPage === 1 ? "First" : "Previous"}
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
            role="button"
            id="next"
            onClick={() => handleClick("next")}
            className={`page-link ${currentPage === totalPage ? "disabled" : ""}`}
          >
            {currentPage === totalPage ? "Last" : "Next"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
