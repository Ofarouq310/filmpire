import { useGetMoviesQuery } from '../services/TMDB'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import { selectPage } from '../features/currentGenreOrCategory';


export default function Movies() {

    const {genreOrCategoryName, page} = useSelector((state) => state.currentGenreOrCategory);
    const {data, error, isFetching } = useGetMoviesQuery({genreOrCategoryName, page});
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      if (data?.results) {
        setMovies(data.results);
      }
    }, [data]);

    const dispatch = useDispatch();


    if (isFetching) return <div className='w-full h-screen text-center flex items-center justify-center p-10'><Spinner /></div>;
    if (error) return <p className="w-full flex items-center justify-center p-10 text-red-500">Something went wrong!</p>;

    return (
        <section className='flex flex-col items-center justify-center mb-10'>
          <div className='p-8 all-movies'>
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          </div>
            <Pagination
              count={data?.total_pages} 
              size='large' 
              color='secondary'  
              showFirstButton 
              showLastButton
              page={page}
               onChange={(event, value) => {
                dispatch(selectPage(value));
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
  )
}
