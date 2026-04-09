import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API URL from env or default to relative path for same-domain deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Menu", "Services", "Blog", "Team", "Event", "Auth"],
  endpoints: () => ({}),
});
