import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
      document.documentElement.setAttribute("data-theme", state.mode);
    },
    initTheme: (state) => {
      document.documentElement.setAttribute("data-theme", state.mode);
    }
  },
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
