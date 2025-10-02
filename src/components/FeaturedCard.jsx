import { Link } from "react-router-dom";

export default function FeaturedCard({ movie }) {
  const featuredMovie = movie[0];
  if (!featuredMovie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`;

  return (
    <Link
      to={`/movie/${featuredMovie.id}`}
      className="mt-10 w-full block group overflow-hidden shadow-2xl"
    >
      <div
        className="relative h-[490px] w-full rounded-lg overflow-hidden bg-center bg-cover  transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute z-5 inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent transition duration-300 group-hover:from-black/95 group-hover:via-black/60" />

        <div className="absolute z-5 inset-0 p-10 flex flex-col justify-end">
          <h3 className="text-gray-100 text-3xl font-bold drop-shadow-md">
            {featuredMovie.title}
          </h3>
          <p className="text-gray-200 text-base mt-2 max-w-xl line-clamp-3 drop-shadow-sm">
            {featuredMovie.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
