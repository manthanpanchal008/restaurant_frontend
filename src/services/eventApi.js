import { baseApi } from "./baseapi";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ALL EVENTS
    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Event"],
    }),

    // ✅ GET SINGLE EVENT
    getSingleEvent: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: ["Event"],
    }),

     //add menu to db
     addEvent: builder.mutation({
        query: (data) => ({
          url: "/events",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Event"],
      }),
  
      //delete paticular menu item
      deleteEvent: builder.mutation({
        query: (id) => ({
          url: `/events/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Event"],
      }),
  
      //update menu item
      updateEvent: builder.mutation({
        query: ({ id, data }) => ({
          url: `/events/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Event"],
      }),

  }),
});

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation
} = eventApi;