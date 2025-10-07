import { useParams } from "react-router-dom"
import { useMovieDetailsQuery, useGetRecommendationsQuery, useGetWatchProvidersQuery } from '../services/TMDB';
import Spinner from '../components/Spinner';
import Rating from "@mui/material/Rating"
import { styled } from '@mui/material/styles';
import Cast from "../components/Cast";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';
import WebsiteIcon from '@mui/icons-material/Language';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Filter1Icon from '@mui/icons-material/Filter1';
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useMoviesActions } from '../utils/moviesLibrary'
import { useSelector } from "react-redux";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useEffect, useMemo } from 'react';


const ThemedButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isFavorite' && prop !== 'isWatchlisted',
})(({ isFavorite, isWatchlisted, theme }) => ({
  backgroundColor: isFavorite
    ? "#E50914"
    : isWatchlisted
    ? "#2563eb"
    : "#6A9C89",

  color: "#fff",
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "8px",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    backgroundColor: isFavorite
      ? "#B20710"
      : isWatchlisted
      ? "#1d4ed8"
      : "#588173",
  },


  [".dark &"]: {
    backgroundColor: isFavorite
      ? "#E50914"
      : isWatchlisted
      ? "#3b82f6"
      : "oklch(21% 0.034 264.665)",
    color: "#f1f5f9",
  },

  [".dark &:hover"]: {
    backgroundColor: isFavorite
      ? "#B20710"
      : isWatchlisted
      ? "#2563eb"
      : "#374151",
  },

  "&.Mui-disabled": {
    backgroundColor: "transparent",
    color: "#6b7280",
  },

  [".dark &.Mui-disabled"]: {
    backgroundColor: "transparent",
    color: "#9ca3af",
  },
}));


const ColoredTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1f2937",
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: 500,
    borderRadius: "8px",
    padding: "6px 12px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#1f2937",
  },

  ".dark & .MuiTooltip-tooltip": {
    backgroundColor: "#6A9C89",
    color: "#f1f5f9", 
  },
  ".dark & .MuiTooltip-arrow": {
    color: "#6A9C89",
  },
}));

const StyledRating = styled(Rating)({
 "& .MuiRating-iconFilled": {
   color: "#1e2939",
 },
 "& .MuiRating-iconEmpty": {
   color: "#6b7280", 
 },

 ".dark & .MuiRating-iconFilled": {
   color: "#6A9C89", 
 },
 ".dark & .MuiRating-iconEmpty": {
   color: "#a1a1aa",
 },
});

export default function MovieInformation() {

  const navigate = useNavigate();
  
  const params = useParams();
  const {
    data: movie,
    error: movieError,
    isFetching: movieLoading,
  } = useMovieDetailsQuery(params.id, { skip: !params.id });
  const { data: recommendations } = useGetRecommendationsQuery(params.id, { skip: !params.id });
  const { data: providers } = useGetWatchProvidersQuery(params.id, { skip: !params.id });
  
  
  const {addToWatchlist, addToFavorites} = useMoviesActions();
  
  
  const regionProviders = providers?.results?.US || providers?.results?.GB || providers?.results?.CA;
  
  const availableProviders =
  regionProviders?.flatrate ||
  regionProviders?.rent ||
  regionProviders?.buy;
  
  const date = useMemo(() => {
    if (!movie?.release_date) return "";
    return new Date(movie.release_date)
    .toDateString()
    .split(" ")
    .slice(1)
    .join(" ");
  }, [movie?.release_date]);
  
  
  const { isAuthenticated, movies = { favorites: [], watchlist: [] } } =
    useSelector((state) => state.auth || { movies: { favorites: [], watchlist: [] } });
    
    const containsId = (collection, id) => {
      if (!collection) return false;
      return collection.some((entry) => {
        if (!entry && entry !== 0) return false;
        return typeof entry === "object" ? entry.id === id : Number(entry) === id;
    });
  };

  const numericId = Number(params.id);
  const isFavorite = containsId(movies.favorites, numericId);
  const isWatchlisted = containsId(movies.watchlist, numericId);
  
  
  const handleToggleFavorite = () => {
    if (!movie) return;
    addToFavorites(movie);
  };
  
  const handleToggleWatchlist = () => {
    if (!movie) return;
    addToWatchlist(movie);
  };
  
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movie])
  
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
      
      
      const officialTrailer =
      movie.videos?.results?.find(
        (video) =>
          video.type === "Teaser" &&
            video.name.toLowerCase().includes("official teaser") ||
            video.name.toLowerCase().includes("official trailer")
        ) ||
        movie.videos?.results?.find((video) => video.type === "Teaser")
        || movie.videos.results[0];
        
  

      return (
      <section className="text-black dark:text-white h-full flex flex-col items-center justify-center">
      <div className="size-full flex flex-col gap-5 rounded-lg lg:flex-row md:max-w-lg lg:max-w-5xl py-10 sm:px-5">
        <div className='flex-1 flex justify-center'>
            <div className="relative flex flex-col min-[73.75rem]:justify-between">
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`${movie.poster} poster`}
                  className="shadow-black shadow-xl/50 rounded-t-md min-[73.75rem]:h-[400px] max-[73.75rem]:h-[350px]"
                />

              {availableProviders && (
                <div className="flex flex-col items-center justify-center gap-1 mt-1">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {regionProviders?.flatrate
                    ? "Streaming on"
                    : regionProviders?.buy
                    ? "Available to buy on"
                    : "Available on"
                    }
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {availableProviders.map((provider) => (
                        <a
                          key={provider.provider_name}
                          href={regionProviders?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition transform hover:scale-105"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="w-10 h-10 rounded-md shadow-md"
                          />
                        </a>
                    ))}
                  </div>
                </div>
              )}

          </div>
        </div>

        <div className='flex-2 px-3 sm:px-5 flex flex-col gap-3'>
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
              {movie?.credits?.cast?.slice(0,6)?.map((actor)=> <Cast key={actor.id} actor={actor} />)}
            </div>
          </div>
          
          <div className="movie-information-btns flex justify-center items-center flex-wrap gap-2">
            <div>
                <Stack direction="row" spacing={0.2}>
                  <ThemedButton href={movie.homepage || null} target="_blank" rel="noopener noreferrer" size="small" variant={movie.homepage ? "contained" : "disabled"} endIcon={<WebsiteIcon />}>Website</ThemedButton>
                  <ThemedButton href={`https://www.imdb.com/title/${movie.imdb_id}/`} target="_blank" rel="noopener noreferrer" size="small" variant="contained" endIcon={<LocalMoviesIcon />}>IMDB</ThemedButton>
                  {movie.videos?.results?.length > 0 && (
                  <ThemedButton href={`https://www.youtube.com/watch?v=${officialTrailer.key}`} target="_blank" rel="noopener noreferrer" size="small" variant={officialTrailer ? "contained" : "disabled"} endIcon={<MovieIcon />}>Trailer</ThemedButton>
                  )}
                  </Stack>
            </div>
            
             <div>
          <Stack direction="row" spacing={0.2}>
            <ColoredTooltip
              title={!isAuthenticated ? "Log in to mark as favorite" : ""}
              arrow
            >
              <span>
                <ThemedButton
                  size="small"
                  variant={isAuthenticated ? "contained" : "disabled"}
                  endIcon={<FavoriteIcon />}
                  isFavorite={isFavorite}
                  disabled={!isAuthenticated}
                  onClick={handleToggleFavorite}
                >
                  {isFavorite ? "Favorited" : "Favorite"}
                </ThemedButton>
              </span>
            </ColoredTooltip>

            <ColoredTooltip
              title={!isAuthenticated ? "Log in to add to watchlist" : ""}
              arrow
            >
              <span>
                <ThemedButton
                  isWatchlisted={isWatchlisted}
                  size="small"
                  variant={isAuthenticated ? "contained" : "disabled"}
                  endIcon={<Filter1Icon />}
                  disabled={!isAuthenticated}
                  onClick={handleToggleWatchlist}
                >
                  {isWatchlisted ? "Watchlisted" : "Watchlist"}
                </ThemedButton>
              </span>
            </ColoredTooltip>

            <ThemedButton onClick={() => navigate(-1)} size="small" variant="contained" endIcon={<ArrowBackIosIcon />}>Back</ThemedButton>
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
        