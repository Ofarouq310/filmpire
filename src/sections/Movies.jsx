import { useGetMoviesQuery } from '../services/TMDB';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { selectPage } from '../features/currentGenreOrCategory';

export default function Movies() {
  const { genreOrCategoryName, page, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreOrCategoryName,
    page,
    searchQuery,
  });   

  const dispatch = useDispatch();

  if (isFetching)
    return (
      <div className="w-full h-screen text-center flex items-center justify-center p-10">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <p className="w-full flex items-center justify-center p-10 text-red-500">
        Something went wrong!
      </p>
    );

  if (!data?.results?.length)
    return (
      <p className="w-full flex items-center justify-center p-10 text-gray-400">
        No movies found.
      </p>
    );

  return (
    <section className="flex flex-col items-center justify-center mb-10">
      <div className="p-8 all-movies">
        <ul>
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
      <Pagination
        count={Math.min(data.total_pages, 500)}
        size="large"
        color="secondary"
        showFirstButton
        showLastButton
        page={page}
        onChange={(event, value) => {
          dispatch(selectPage(value));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
          },
          "& .Mui-selected": {
            color: "secondary",
            backgroundColor: "black",
          },
        }}
      />
    </section>
  );
}
