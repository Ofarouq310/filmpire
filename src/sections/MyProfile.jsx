import { logout } from "../utils";
import { logoutUser } from "../features/auth";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useMoviesActions } from '../utils/moviesLibrary'
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";


export default function MyProfile() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      localStorage.removeItem("session_id");
      localStorage.removeItem("request_token");
      dispatch(logoutUser());
      navigate('/');
    }
  };

  const {getWatchlist, getFavorites} = useMoviesActions();

  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const favs = await getFavorites();
      const watch = await getWatchlist();
      setFavorites(favs || []);
      setWatchlist(watch || []);
    } catch (err) {
      setError(err.response?.data?.status_message || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
  
  return (
    <div className="p-8 pb-2">
      <div className='bg-[#6A9C89] dark:bg-gray-900 p-8 flex justify-between items-center'>
        <h2>My Profile</h2>
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
          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>No movies in watchlist yet</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </div>
      </div>
    )}
    </div>
  )
}
