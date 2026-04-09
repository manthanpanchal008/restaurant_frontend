import { baseApi } from "./baseapi";

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //to get menu
    getMenu: builder.query({
      query: () => "/menu",
      providesTags: ["Menu"],
    }),

    //to get single item from menu
    getSingleMenu: builder.query({
      query: (id) => `/menu/${id}`,
      providesTags: ["Menu"],
    }),

    //add menu to db
    addMenu: builder.mutation({
      query: (data) => ({
        url: "/menu",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),

    //delete paticular menu item
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),

    //update menu item
    updateMenu: builder.mutation({
      query: ({ id, data }) => ({
        url: `/menu/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenuQuery,
  useGetSingleMenuQuery,
  useAddMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
