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
    <div className="bg-white text-black h-dvh">MovieInformation : {movie.overview} </div>
  )
}
        