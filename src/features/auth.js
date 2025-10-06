import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isAuthenticated: false,
    sessionID: "",
    movies: {
      favorites: [],
      watchlist: [],
    },
  },
  reducers: {
    setUser: (state, action) => {
      const { user, session_id } = action.payload || {};
      if (user && user.id) {
        state.user = user;
        state.isAuthenticated = true;
        state.sessionID = session_id || null;

        localStorage.setItem("user", user.id);
        if (session_id) localStorage.setItem("session_id", session_id);
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.sessionID = null;
      }
    },

    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.sessionID = null;
      state.movies = { favorites: [], watchlist: [] };
      localStorage.removeItem("session_id");
    },

    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.movies.favorites.some((m) => m.id === movie.id);
      state.movies.favorites = exists
        ? state.movies.favorites.filter((m) => m.id !== movie.id)
        : [...state.movies.favorites, movie];
    },

    toggleWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.movies.watchlist.some((m) => m.id === movie.id);
      state.movies.watchlist = exists
        ? state.movies.watchlist.filter((m) => m.id !== movie.id)
        : [...state.movies.watchlist, movie];
    },
    setMovies: (state, action) => {
    const { favorites = [], watchlist = [] } = action.payload || {};
    state.movies = { favorites, watchlist };
  },
  },
});

export const { setUser, logoutUser, toggleFavorite, toggleWatchlist, setMovies } =
  authSlice.actions;

export default authSlice.reducer;
