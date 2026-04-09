import { baseApi } from "./baseapi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order"],
    }),

    getMyOrders: builder.query({
      query: () => "/order",
    }),

    getAllOrders: builder.query({
      query: () => "/order/all",
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { usePlaceOrderMutation, useGetMyOrdersQuery,useGetAllOrdersQuery,useUpdateOrderStatusMutation } = orderApi;
