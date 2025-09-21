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
    },
    selectPage: (state, action) => {
      state.page = action.payload;
  }
}
})

export const { selectGenreOrCategory, selectPage } = genreOrCategory.actions;

export default genreOrCategory.reducer;