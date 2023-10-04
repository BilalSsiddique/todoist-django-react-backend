import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todos } from "../../../utils/types/type";
import { IformData } from "../../../utils/types/type";

export const todoApi = createApi({
  reducerPath: "TodosApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    createList: builder.mutation({
      query: (formData) => ({
        url: "create_list",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createTask: builder.mutation<
      Todos,
      { token: string | null; formData: IformData }
    >({
      query: ({ token, formData }) => ({
        url: "create_task",
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
    getList: builder.query({
      query: (token: string | null) => ({
        url: "get_list",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
        tagTypes: ["get_lst"],
      }),
    }),
    getTask: builder.query({
      query: ({ token, page }) => ({
        url: `get_task?page=${page}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
    partialUpdateTask: builder.mutation({
      query: ({ token, updatedTodo }) => ({
        url: `partial_update_task/${updatedTodo.id}`,
        method: "PATCH",
        body: updatedTodo,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
    updateTask: builder.mutation({
      query: ({ token, formData }) => ({
        url: `update_task/${formData.id}`,
        method: "PUT",
        body: formData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
    deleteTask: builder.mutation({
      query: ({ token, id }) => ({
        url: `delete_task/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
    getTaskById: builder.mutation({
      query: ({ token, id }) => ({
        url: `get_task_by_id/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
    getPerformance: builder.query({
      query: ({ token }) => ({
        url: `get_performance`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateListMutation,
  useGetListQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  usePartialUpdateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdMutation,
  useGetPerformanceQuery,
} = todoApi;
export default todoApi;
