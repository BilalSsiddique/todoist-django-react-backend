import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IformData } from "../../../utils/types/type";

interface initialState {
  isTodoOpen: boolean;
  isEditTodo: boolean;
  formData: IformData;
}

const formDataInitialState = {
  id: null,
  title: "",
  description: "",
  due_date: "",
  updated_at: "",
  created_at: "",
  is_Completed: false,
  priority: 1,
  list_id: null,
  list_title: "work tasks",
};

const initialState: initialState = {
  isEditTodo: false,
  isTodoOpen: false,
  formData: formDataInitialState,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setIsEditTodo: (state, action) => {
      state.isEditTodo = action.payload;
    },
    setIsTodoOpen: (state, action) => {
      state.isTodoOpen = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

const { actions, reducer } = todoSlice;
export const { setIsTodoOpen, setIsEditTodo, setFormData } = actions;
export const selectTodoOpen = (state: RootState) => state.todo.isTodoOpen;
export const selectTodoEdit = (state: RootState) => state.todo.isEditTodo;
export const selectFormData = (state: RootState) => state.todo.formData;
export default reducer;
