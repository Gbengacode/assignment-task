import { createSlice } from "@reduxjs/toolkit";
import { getTask, postTask, removeTask, updateTask } from "./apis";
const initialState = {
  value: [],
  loading: false,
  error: "",
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [getTask.pending]: (state, action) => {
      state.loading = true;
    },
    [getTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.value = [...action.payload];
    },
    [getTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [postTask.pending]: (state, action) => {
      state.loading = true;
    },
    [postTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.value.push(action.payload);
    },
    [postTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [removeTask.pending]: (state, action) => {
      state.loading = true;
    },
    [removeTask.fulfilled]: (state, action) => {
      state.loading = false;
      const task = state.value.filter((task) => task.id !== action.payload);
      state.value = task;
    },
    [removeTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateTask.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTask.fulfilled]: (state, action) => {
     const existTask = state.value.find(task => task.id === action.payload.id)
     if(existTask){
       existTask.id = action.payload.id
       existTask.assigned_user = action.payload.assigned_user
       existTask.task_date = action.payload.task_date
       existTask.task_time = action.payload.task_time
       existTask.is_completed = action.payload.is_completed
       existTask.task_msg = action.payload.task_msg
     }
      state.loading = false;
    },
    [updateTask.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
})
 
export default taskSlice.reducer;
