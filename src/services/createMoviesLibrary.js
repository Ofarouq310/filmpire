import axios from "axios";

const createMoviesLibrary = (account_id, session_id) =>
  axios.create({
    baseURL: `https://api.themoviedb.org/3/account/${account_id}`,
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      session_id,
    },
  });

export default createMoviesLibrary;
