import { baseApi } from "./baseapi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //to get service
    getService: builder.query({
      query: () => "/services",
      providesTags: ["service"],
    }),

    //to get single item from service
    getSingleService: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: ["service"],
    }),

    //add service to db
    addService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    //delete paticular service item
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),

    //update service item
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
