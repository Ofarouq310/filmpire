import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreOrCategoryName = action.payload;
      state.page = 1;
      state.searchQuery = "";
    },
    selectPage: (state, action) => {
      state.page = action.payload;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  resetState: (state) => {
    state.genreOrCategoryName = "";
    state.page = 1;
    state.searchQuery = "";
  },
});

export const { selectGenreOrCategory, selectPage, searchMovie, resetState } =
  genreOrCategory.actions;
export default genreOrCategory.reducer;
