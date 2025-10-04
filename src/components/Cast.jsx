import { Link } from "react-router-dom";
import noPoster from "../assets/imgs/no-movie.png"


export default function Cast({actor}) {
  return (
    <div className="flex flex-col gap-1">
      <Link to={`/actor/${actor.id}`}>
        <img 
        src= { actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : noPoster} 
        alt={actor.name} 
        className="w-20 h-[6.5em]" 
        />
      </Link>
      <h4 className="text-xs max-w-19">{actor.name}</h4>
      <h5 className="text-xs max-w-19 text-gray-400">{actor.character}</h5>
    </div>
  )
}