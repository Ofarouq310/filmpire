import { Link } from "react-router-dom";

export default function FeaturedCard({ movie }) {
  if (!movie || !movie.length) return null;

  const featured = movie[0];

  const imageBase = "https://image.tmdb.org/t/p";

  const imageUrl = `${imageBase}/w780${featured.backdrop_path}`;

  return (
    <Link
      to={`/movie/${featured.id}`}
      className="mt-5 w-full block group overflow-hidden shadow-2xl"
    >
      <div className="relative h-[490px] w-full sm:rounded-lg overflow-hidden bg-center bg-cover transition-transform duration-500 group-hover:scale-[1.02]">
        <img
          src={imageUrl}
          srcSet={`
          ${imageBase}/w300${featured.backdrop_path} 300w,
          ${imageBase}/w780${featured.backdrop_path} 780w,
          ${imageBase}/w1280${featured.backdrop_path} 1280w
        `}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          alt={featured.title || featured.name}
          width="1280"
          height="720"
          className="w-full h-auto object-cover"
          fetchPriority="high" // 👈 tells the browser it's the top priority
          loading="eager" // 👈 avoids deferring this critical image
          decoding="async"
        />
        <div className="absolute z-5 inset-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent transition duration-300 group-hover:from-black/95 group-hover:via-black/60" />

        <div className="absolute z-5 inset-0 p-10 flex flex-col justify-end">
          <h3 className="text-gray-100 text-3xl font-bold drop-shadow-md">
            {featured.title}
          </h3>
          <p className="text-gray-200 text-base mt-2 max-w-xl line-clamp-3 drop-shadow-sm">
            {featured.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
