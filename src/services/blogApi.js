import { baseApi } from "./baseapi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ GET ALL BLOGS
    getBlogs: builder.query({
      query: () => "/blog",
      providesTags: ["Blog"],
    }),

    // ✅ GET SINGLE BLOG
    getSingleBlog: builder.query({
      query: (id) => `/blog/${id}`,
      providesTags: ["Blog"],
    }),

    // ✅ ADD BLOG
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    // ✅ UPDATE BLOG
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    // ✅ DELETE BLOG
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

  }),
});

// ✅ EXPORT HOOKS
export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;