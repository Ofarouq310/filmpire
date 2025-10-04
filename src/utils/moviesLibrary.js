import createMoviesLibrary from '../services/createMoviesLibrary';
import { useSelector } from 'react-redux';

export function useMoviesActions() {
 const { sessionID: session_id, user } = useSelector((state) => state.auth);
  const account_id = user?.id; // safe access

  const moviesLibrary = account_id && session_id
    ? createMoviesLibrary(account_id, session_id)
    : null;

  const addToFavorites = async (mediaID) => {
    try {
      const { data } = await moviesLibrary.post("/favorite", {
        media_type: "movie",
        media_id: mediaID,
        favorite: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToWatchlist = async (mediaID) => {
    try {
      const { data } = await moviesLibrary.post("/watchlist", {
        media_type: "movie",
        media_id: mediaID,
        watchlist: true,
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getFavorites = async () => {
    try {
      const { data } = await moviesLibrary.get("/favorite/movies")
      console.log(data);
      return data.results;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

   const getWatchlist = async () => {
    try {
      const { data } = await moviesLibrary.get("/watchlist/movies")
      console.log(data);
      return data.results;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };
  
  return { addToFavorites, addToWatchlist, getWatchlist, getFavorites };
}