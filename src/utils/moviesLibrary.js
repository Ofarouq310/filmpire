import createMoviesLibrary from '../services/createMoviesLibrary';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../features/auth'; // make sure you have this reducer

export function useMoviesActions() {
  const { sessionID: session_id, user, movies } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const account_id = user?.id;

  const moviesLibrary =
    account_id && session_id ? createMoviesLibrary(account_id, session_id) : null;

  const addToFavorites = async (movie) => {
    if (!moviesLibrary) return;

    const isAlreadyFavorite = movies.favorites.some((m) => m.id === movie.id);
    const newFavoriteStatus = !isAlreadyFavorite;

    try {
      await moviesLibrary.post('/favorite', {
        media_type: 'movie',
        media_id: movie.id,
        favorite: newFavoriteStatus,
      });

      const updatedFavorites = newFavoriteStatus
        ? [...movies.favorites, movie]
        : movies.favorites.filter((m) => m.id !== movie.id);

      dispatch(setMovies({ ...movies, favorites: updatedFavorites }));
    } catch (error) {
      console.error('Error toggling favorite:', error.response?.data || error.message);
    }
  };

  const addToWatchlist = async (movie) => {
    if (!moviesLibrary) return;

    const isAlreadyWatchlisted = movies.watchlist.some((m) => m.id === movie.id);
    const newWatchlistStatus = !isAlreadyWatchlisted;

    try {
      await moviesLibrary.post('/watchlist', {
        media_type: 'movie',
        media_id: movie.id,
        watchlist: newWatchlistStatus,
      });

      const updatedWatchlist = newWatchlistStatus
        ? [...movies.watchlist, movie]
        : movies.watchlist.filter((m) => m.id !== movie.id);

      dispatch(setMovies({ ...movies, watchlist: updatedWatchlist }));
    } catch (error) {
      console.error('Error toggling watchlist:', error.response?.data || error.message);
    }
  };

  const getFavorites = async () => {
    if (!moviesLibrary) return [];
    try {
      const { data } = await moviesLibrary.get('/favorite/movies');
      return data.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const getWatchlist = async () => {
    if (!moviesLibrary) return [];
    try {
      const { data } = await moviesLibrary.get('/watchlist/movies');
      return data.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  return { addToFavorites, addToWatchlist, getFavorites, getWatchlist };
}
