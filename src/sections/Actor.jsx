import { useParams } from "react-router-dom"
import { useGetActorQuery } from "../services/TMDB";
import  MovieCard  from '../components/MovieCard'
import Spinner from "../components/Spinner";
import Button from '@mui/material/Button';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import noPoster from "../assets/imgs/no-movie.png"



export default function Actor() {
  
  window.scrollTo({ top: 0, behavior: "smooth" });
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id)
  const {data: actor, error:actorError, isFetching:actorIsFetching} = useGetActorQuery(params.id)
  console.log(actor)
  const movies = actor?.movie_credits?.cast;


     if (actorIsFetching)
      return (
          <div className="w-full h-screen text-center flex items-center justify-center p-10">
            <Spinner />
          </div>
        );
        
        if (actorError)
          return (
        <p className="w-full flex items-center justify-center p-10 text-red-500">
            Something went wrong!
          </p>
        );
        
        if (!actor)
          return (
        <p className="w-full flex items-center justify-center p-10 text-gray-400">
            No movies found.
          </p>
        );
  return (
    <section className="text-black dark:text-white h-full flex flex-col items-center justify-center">
      <div className="size-full flex flex-col rounded-lg md:flex-row md:max-w-lg lg:max-w-5xl py-10 sm:px-5">
        <div className='flex-1 flex justify-center'>
          <div className="rounded-full">
            <img 
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : noPoster}
              alt={`${actor.name} poster`}
              className="shadow-black shadow-xl/50 max-md:h-[350px]"
            />
          </div>
        </div>

        <div className='flex-2 px-3 sm:px-5 flex flex-col gap-3'>
          <div className="flex flex-col justify-between items-center px-4 max-md:py-4 leading-normal text-center">
            <h2 className= "text-center">{actor.name}</h2>

          </div>

          <div className="overview">
            <h3>Overview</h3>
            {<p>{actor.biography || "No biography available."}</p>}
          </div>

        <div className="flex flex-wrap gap-2">
          <Button href={`https://www.imdb.com/name/${actor.imdb_id}/`} target="_blank" rel="noopener noreferrer" size="small" variant="contained" endIcon={<LocalMoviesIcon />}>IMDB</Button>
          <Button onClick={() => navigate(-1)} size="small" variant="contained" endIcon={<ArrowBackIosIcon />}>Back</Button>
        </div>

        </div>
      </div>

      <div className="recommendation flex flex-col items-center justify-center">
        <h2>Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 mx-2">
          {movies?.length ? (
  movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
) : (
  <p className="text-gray-400">No movies available</p>
)}
        </div>
      </div>
      
      </section>
  )
}
