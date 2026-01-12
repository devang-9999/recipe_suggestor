import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredUsers: JSON.parse(localStorage.getItem("users")) || [],
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
};

const registerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.registeredUsers.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.registeredUsers));
    },

    loginUser: (state, action) => {
      state.loggedInUser = action.payload;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },

    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { registerUser, loginUser, logoutUser } =
  registerSlice.actions;

export default registerSlice.reducer;
