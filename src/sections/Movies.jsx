import { useGetMoviesQuery } from '../services/TMDB'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

export default function Movies() {

    const {data, error, isFetching } = useGetMoviesQuery();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      if (data?.results) {
        setMovies(data.results);
      }
    }, [data]);

    if (isFetching) return <div className='w-full h-screen text-center flex items-center justify-center p-10'><Spinner /></div>;
    if (error) return <p className="w-full flex items-center justify-center p-10 text-red-500">Something went wrong!</p>;

    return (
        <section className='p-8 all-movies'>

            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
        
        </section>
  )
}
