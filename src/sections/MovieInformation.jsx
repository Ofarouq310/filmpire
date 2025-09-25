import { useParams } from "react-router-dom"
import { useMovieDetailsQuery } from '../services/TMDB';
import Spinner from '../components/Spinner';

export default function MovieInformation() {

  const params = useParams();
  const { data:movie, error, isFetching } = useMovieDetailsQuery( params.id );   
  console.log(movie);
    
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
  
    if (!movie)
      return (
        <p className="w-full flex items-center justify-center p-10 text-gray-400">
          No movies found.
        </p>
      );
  
  return (
    <section className="bg-white text-black h-screen">
      <div className="flex space-around w-full py-7 px-12 gap-5">
        <div className='bg-amber-100 flex-1'>
          <div className="rounded-full">
            <img 
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={`${movie.poster} poster`}
              className="size-full rounded-2xl shadow-black shadow-2xl"
            />
          </div>
        </div>
        <div className='flex-2 pt-2'>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className= "text-center">{movie.title}</h2>

            <h3>{movie.tagline}</h3>

            <div className=""></div>

            <div className=""></div>
          </div>
        </div>
      </div>
    </section>
  )
}
        