import { useParams } from "react-router-dom"
import { useMovieDetailsQuery, useGetRecommendationsQuery} from '../services/TMDB';
import Spinner from '../components/Spinner';
import Rating from "@mui/material/Rating"
import { styled } from "@mui/styles";
import Cast from "../components/Cast";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';
import WebsiteIcon from '@mui/icons-material/Language';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Filter1Icon from '@mui/icons-material/Filter1';
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";



export default function MovieInformation() {

  const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
      color: 'white',
  },
    "& .MuiRating-iconEmpty": {
  color: "gray",
},
  });

  const params = useParams();
  const {
  data: movie,
  error: movieError,
  isFetching: movieLoading,
} = useMovieDetailsQuery(params.id);

const {
  data: recommendations,
  error: recError,
  isFetching: recLoading,
} = useGetRecommendationsQuery(params.id);
  
  if (movieLoading)
    return (
        <div className="w-full h-screen text-center flex items-center justify-center p-10">
          <Spinner />
        </div>
      );
      
      if (movieError)
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

      const date = new Date(`${movie.release_date}`).toDateString().split(' ').slice(1).join(' ');

      const officialTrailer =
        movie.videos?.results?.find(
          (video) =>
            video.type === "Teaser" &&
            video.name.toLowerCase().includes("official teaser") ||
            video.name.toLowerCase().includes("official trailer")
        ) ||
        movie.videos?.results?.find((video) => video.type === "Teaser");

      return (
      <section className="text-white h-full flex flex-col items-center justify-center bg-gray-800">
      <div className="size-full flex flex-col rounded-lg md:flex-row md:max-w-lg lg:max-w-5xl py-10 sm:px-5">
        <div className='flex-1 flex justify-center'>
          <div className="rounded-full">
            <img 
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.poster} poster`}
              className="shadow-black shadow-xl/50 max-md:h-[350px]"
            />
          </div>
        </div>

        <div className='flex-2  px-3 smpx-5 flex flex-col gap-3'>
          <div className="flex flex-col justify-between items-center px-4 max-md:py-4 leading-normal text-center">
            <h2 className= "text-center">{movie.title}</h2>

            <h3>{movie.tagline}</h3>

            <div className="w-full flex justify-around items-center mb-5">
              <div className="flex flex-wrap justify-center gap-2">
               <StyledRating readOnly defaultValue={movie.vote_average/2} precision={0.1} />
               <span>{movie.vote_average.toFixed(1)} /10</span>
              </div>

              <div className="flex flex-wrap justify-center">
                <span>{movie.runtime} mins / {date}</span>
              </div>
            </div>

              <div className="w-full flex flex-wrap justify-center gap-2 lg:gap-10">
                {movie?.genres?.map((genre)=> {
                 return <span key={genre.id}>{genre.name}</span>
                })}
              </div>
          </div>

          <div className="overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>

          <div className="cast">
            <h3>Top Cast</h3>
            <div className="flex max-w-full flex-wrap gap-4">
              {movie?.credits?.cast.slice(0,6).map((actor)=> <Cast key={actor.id} actor={actor} />)}
            </div>
          </div>
          
          <div className="movie-information-btns flex justify-center flex-wrap gap-2">
            <div>
                <Stack direction="row" spacing={0.2}>
                  <Button href={movie.homepage || null} target="_blank" rel="noopener noreferrer" size="small" variant={movie.homepage ? "contained" : "disabled"} endIcon={<WebsiteIcon />}>Website</Button>
                  <Button href={`https://www.imdb.com/title/${movie.imdb_id}/`} target="_blank" rel="noopener noreferrer" size="small" variant="contained" endIcon={<LocalMoviesIcon />}>IMDB</Button>
                  {movie.videos?.results?.length > 0 && (
                  <Button href="{`https://www.youtube.com/watch?v=${officialTrailer.key}` || null" target="_blank" rel="noopener noreferrer" size="small" variant={officialTrailer ? "contained" : "disabled"} endIcon={<MovieIcon />}>Trailer</Button>
                  )}
                  </Stack>
            </div>
            
            <div>
                <Stack direction="row" spacing={0.2}>
                  <Button  size="small" variant="contained" endIcon={<FavoriteIcon />}>Favorite</Button>
                  <Button  size="small" variant="contained" endIcon={<Filter1Icon />}>Watchlist</Button>
                  <Button component={Link} to="/" size="small" variant="contained" endIcon={<ArrowBackIosIcon />}>Back</Button>
                </Stack>
            </div>
          </div>


        </div>
      </div>

      <div className="recommendation flex flex-col items-center justify-center">
        <h2>You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 mx-2">
          {recommendations ?
          recommendations.results.map((movie)=> <MovieCard key={movie.id} movie={movie} />)
          : <h2>No movies to recommend</h2>
          }
        </div>
      </div>
      
      </section>
  )
}
        