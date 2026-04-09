import { baseApi } from "./baseapi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Get current user
    getProfile: builder.query({
      query: () => "/auth/userprofile",
      providesTags: ["user"],
    }),

    // ✅ Update user
    updateProfile: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/auth/updateuser`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),

  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;