import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice ({
  name: 'genreOrCategory',
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreOrCategoryName = action.payload;
      state.page = 1;
      state.searchQuery = '';
    },
    selectPage: (state, action) => {
      state.page = action.payload;
  },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
})

export const { selectGenreOrCategory, selectPage, searchMovie } = genreOrCategory.actions;
export default genreOrCategory.reducer;