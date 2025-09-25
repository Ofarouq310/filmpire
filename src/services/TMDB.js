import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery ({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: ({genreOrCategoryName, page = 1, searchQuery = ''}) => {
                if (searchQuery){
                    return `search/movie?query=${encodeURIComponent(searchQuery)}&page=${page}&api_key=${tmdbApiKey}`;
                }
                if (genreOrCategoryName && typeof genreOrCategoryName === "string") {
                    return `movie/${genreOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                if (genreOrCategoryName && typeof genreOrCategoryName === "number") {
                    return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                    return `movie/now_playing?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),
        movieDetails: builder.query({
            query: (id) => {
                if(id){
                    return `movie/${id}?api_key=${tmdbApiKey}`;
                }
            }
        }),
    }),
})

export const {useGetMoviesQuery, useMovieDetailsQuery} = tmdbApi;