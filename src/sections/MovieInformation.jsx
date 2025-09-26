import { useParams } from "react-router-dom"
import { useMovieDetailsQuery } from '../services/TMDB';
import Spinner from '../components/Spinner';
import Rating from "@mui/material/Rating"
import { styled } from "@mui/styles";

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
  const { data:movie, error, isFetching } = useMovieDetailsQuery( params.id );   
  
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

      const date = new Date(`${movie.release_date}`).toDateString().split(' ').slice(1).join(' ');

      return (
      <section className="text-white h-full flex items-center justify-center bg-gray-800">

      <div className="size-full flex flex-col rounded-lg md:flex-row md:max-w-lg lg:max-w-5xl py-10 px-5">
        <div className='flex-1 flex justify-center'>
          <div className="rounded-full">
            <img 
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.poster} poster`}
              className="shadow-black shadow-xl/50 max-md:h-[350px]"
            />
          </div>
        </div>

        <div className='flex-2 px-5'>
          <div className="flex flex-col justify-between items-center px-4 max-md:py-4 leading-normal text-center">
            <h2 className= "text-center">{movie.title}</h2>

            <h3>{movie.tagline}</h3>

            <div className="w-full flex justify-around items-center mb-5">
              <div className="flex flex-wrap justify-center gap-2">
               <StyledRating readOnly defaultValue={movie.vote_average/2} precision={0.1} />
               <span>{movie.vote_average} /10</span>
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

          <div className="">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      
      </section>
  )
}
        