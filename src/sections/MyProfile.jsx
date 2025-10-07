import { logout } from "../utils";
import { logoutUser } from "../features/auth";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useMoviesActions } from "../utils/moviesLibrary";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { setMovies } from "../features/auth";

export default function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, user } = useSelector((state) => state.auth);
  const { getFavorites, getWatchlist } = useMoviesActions();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      localStorage.removeItem("session_id");
      localStorage.removeItem("request_token");
      dispatch(logoutUser());
      navigate("/");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const [favs, watch] = await Promise.all([getFavorites(), getWatchlist()]);
        dispatch(setMovies({ favorites: favs, watchlist: watch }));
      } catch (err) {
        setError(err.response?.data?.status_message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, user?.id]);

  return (
    <div className="p-8 pb-2">
      <div className="bg-[#6A9C89] dark:bg-gray-900 p-8 flex max-sm:flex-col justify-between items-center">
        <h2 className="sm:text-2xl sm:m-0 text-lg">My Profile</h2>
        <button onClick={handleLogout} className="flex gap-1 font-black cursor-pointer">
          Logout
          <LogoutIcon />
        </button>
      </div>

      {loading && <p className="text-center mt-5">Loading your movies...</p>}
      {error && <p className="text-center mt-5 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 flex flex-col justify-center">
          <div className="mt-6">
            <h2 className="text-xl font-bold">Favorites</h2>
            {movies?.favorites?.length === 0 ? (
              <p>No favorites yet</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movies.favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold">Watchlist</h2>
            {movies?.watchlist?.length === 0 ? (
              <p>No movies in watchlist yet</p>
            ) : (
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movies.watchlist.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
