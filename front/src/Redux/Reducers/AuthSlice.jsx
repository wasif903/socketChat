import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          url: "/api/login",
          method: "POST",
          body: data,
        };
      },
    }),
    signup: builder.mutation({
      query: (data) => {
        return {
          url: "/api/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    getUsers: builder.query({
      query: () => {
        return {
          url: "/api/all-users",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetUsersQuery } =
  authSlice;
