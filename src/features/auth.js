import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice ({
    name:'user',
    initialState:{
        user: {},
        isAuthenticated: false,
        sessionID:'',
    },
    reducers:{
       setUser: (state, action) => {
  const { user, session_id } = action.payload || {};

  if (user && user.id) {
    state.user = user;
    state.isAuthenticated = true;
    state.sessionID = session_id || null;

    localStorage.setItem("user", user.id);
    if (session_id) {
      localStorage.setItem("session_id", session_id);
    }
  } else {
    // if no valid user → ensure logged out
    state.user = null;
    state.isAuthenticated = false;
    state.sessionID = null;
  }
        },
        logoutUser: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.sessionID = null;
        },
    }    
})

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;