import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../../Config";

export const chatSlice = createApi({
  reducerPath: "chat",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    chat: builder.mutation({
      query: ({ userID, to, message }) => {
        return {
          url: `/api/${userID}/chat/${to}`,
          method: "POST",
          body: { message },
        };
      },
    }),
    // getChats: builder.query({
    //   query: (userID, to) => {
    //     return {
    //       url: `/api/${userID}/get-chats/${to}`,
    //       method: "GET",
    //     };
    //   },
    // }),
  }),
});

export const { useChatMutation, useGetChatsQuery } = chatSlice;
