import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "LoginApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    signup: builder.mutation({
      query: (formData) => ({
        url: "signup",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    logOut: builder.mutation({
      query: (token: string | null) => ({
        url: "logout",
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogOutMutation } = api;
export default api;
