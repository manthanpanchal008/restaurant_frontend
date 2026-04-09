import { baseApi } from "./baseapi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // ✅ Get all users
    getUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["Users"],
    }),

    // ✅ Make admin
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/make-admin/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    // ✅ Remove admin
    removeAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/remove-admin/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

  }),
});

export const {
  useGetUsersQuery,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} = adminApi;