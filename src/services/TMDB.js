import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

const genresMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  science: 878,
  "tv movie": 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page = 1, searchQuery = "" }) => {
        if (searchQuery) {
          return `search/movie?query=${encodeURIComponent(
            searchQuery
          )}&page=${page}&api_key=${tmdbApiKey}`;
        }

        if (genreOrCategoryName && typeof genreOrCategoryName === "string") {
          const category = genreOrCategoryName.toLowerCase();
          const genreId = genresMap[category];
          switch (category) {
            case "popular":
              return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            case "upcoming":
              return `movie/upcoming?page=${page}&api_key=${tmdbApiKey}`;
            case "top_rated":
            case "top-rated":
            case "top rated":
              return `movie/top_rated?page=${page}&api_key=${tmdbApiKey}`;
            default:
              if (genreId) {
                return `discover/movie?with_genres=${genreId}&page=${page}&api_key=${tmdbApiKey}`;
              }
              return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
          }
        }

        if (genreOrCategoryName && typeof genreOrCategoryName === "number") {
          return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        return `movie/now_playing?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    movieDetails: builder.query({
      query: (id) =>
        id
          ? `movie/${id}?api_key=${tmdbApiKey}&append_to_response=credits,videos`
          : undefined,
    }),

    getRecommendations: builder.query({
      query: (id) =>
        id ? `movie/${id}/recommendations?api_key=${tmdbApiKey}` : undefined,
    }),

    getActor: builder.query({
      query: (id) =>
        id
          ? `person/${id}?api_key=${tmdbApiKey}&append_to_response=movie_credits`
          : undefined,
    }),

    getWatchProviders: builder.query({
      query: (id) =>
        id ? `movie/${id}/watch/providers?api_key=${tmdbApiKey}` : undefined,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useMovieDetailsQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetWatchProvidersQuery,
} = tmdbApi;
