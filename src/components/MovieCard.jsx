import noPoster from "../assets/imgs/no-movie.png"
import Rating from "@mui/material/Rating"
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";

export default function MovieCard({movie:{id: movie_id, poster_path, title, vote_average}}) {

    const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: 'white',
    },
     "& .MuiRating-iconEmpty": {
    color: "gray",
  },
});

  return (
    <div className="movie-card hover:scale-102 transform transition-all duration-300 ease-in-out cursor-pointer">
      <Link to={`movie/${movie_id}`} >
        <img src={poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : noPoster
        } 
        alt={title} 
        />
      </Link>

      <div className='mt-0.5 p-4 text-center flex flex-col items-center'>
        <h3>{title}</h3>

        <div className='content'>
          <div className='rating'>
            <StyledRating readOnly defaultValue={vote_average/2} precision={0.1} />
          </div>
            {/* <span>•</span>
            <p className='lang'>{original_language}</p>
            <span>•</span>
            <p className='year'>{release_date.slice(0, 4)}</p> */}
        </div>
      </div>

    </div>
  )
}