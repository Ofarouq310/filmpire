import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import FeaturedCard from "../components/FeaturedCard";
import {
  selectPage,
  selectGenreOrCategory,
} from "../features/currentGenreOrCategory";
import { useGetMoviesQuery } from "../services/TMDB";
import { skipToken } from "@reduxjs/toolkit/query/react";

export default function Movies() {
  const { categoryOrGenre } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const pageFromUrl = parseInt(searchParams.get("page")) || 1;

  const searchParamsUrl = searchParams.get("search") || "";

  const { genreOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (categoryOrGenre && categoryOrGenre !== genreOrCategoryName) {
      dispatch(selectGenreOrCategory(categoryOrGenre));
    }
    dispatch(selectPage(pageFromUrl));
    setIsReady(true);
  }, [categoryOrGenre, genreOrCategoryName, dispatch, pageFromUrl]);

  const { data, error, isFetching } = useGetMoviesQuery(
    isReady
      ? { genreOrCategoryName, page: pageFromUrl, searchQuery: searchParamsUrl }
      : skipToken
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageFromUrl, genreOrCategoryName]);

  if (isFetching)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full flex items-center justify-center text-red-500 p-10">
        Something went wrong!
      </div>
    );

  if (!data?.results?.length)
    return (
      <div className="w-full flex items-center justify-center text-gray-400 p-10">
        No movies found.
      </div>
    );

  return (
    <section className="flex flex-col items-center justify-center mb-10">
      <FeaturedCard movie={data.results.slice(0, 1)} />

      <div className="p-8 all-movies">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.results.slice(1, 17).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center p-2">
        <Pagination
          count={Math.min(data.total_pages, 500)}
          page={pageFromUrl}
          onChange={(event, value) => {
            dispatch(selectPage(value));
            const params = {};
            if (searchQuery) params.search = searchQuery;
            params.page = value;

            setSearchParams(params);
          }}
          showFirstButton
          showLastButton
          size="medium"
          sx={{
            "& .MuiPaginationItem-root": { color: "#1f2937" },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#1e2939",
              color: "#fff",
            },
            ".dark & .MuiPaginationItem-root": { color: "#e5e7eb" },
            ".dark & .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#6A9C89",
              color: "white",
            },
          }}
        />
      </div>
    </section>
  );
}
