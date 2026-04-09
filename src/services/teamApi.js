import { baseApi } from "./baseapi";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ALL TEAM
    getTeam: builder.query({
      query: () => "/team",
      providesTags: ["Team"],
    }),

    // ✅ GET SINGLE TEAM
    getSingleTeam: builder.query({
      query: (id) => `/team/${id}`,
      providesTags: ["Team"],
    }),

    // ✅ ADD TEAM
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/team",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),

    // ✅ UPDATE TEAM
    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/team/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),

    // ✅ DELETE TEAM
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),

  }),
});

// ✅ EXPORT HOOKS
export const {
  useGetTeamQuery,
  useGetSingleTeamQuery,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;