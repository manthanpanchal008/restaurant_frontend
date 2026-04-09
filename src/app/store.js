  import { configureStore, createReducer } from "@reduxjs/toolkit";
  import { baseApi } from "../services/baseapi";
import authReducer from "../slice/authSlice";
import cartReducer from "../slice/cartSlice";

  export const store = configureStore({
    reducer: {
      auth: authReducer,
      cart:cartReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true,
  });
