import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "task/create-task",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: formData,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + "task/get-tasks",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.tasks;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: process.env.NEXT_PUBLIC_API_URL + "task/delete-task",
        data: { taskId: taskId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.taskId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: process.env.NEXT_PUBLIC_API_URL + "task/update-task-status",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.task;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: { allTasks: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.allTasks = [action.payload.task, ...state.allTasks];
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.allTasks = action.payload;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.allTasks = state.allTasks.filter(
        (task) => task._id !== action.payload
      );
    });
    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      state.allTasks = state.allTasks.map((task) => {
        if (task._id === action.payload._id) {
          return { ...task, status: action.payload.status };
        } else return task;
      });
    });
  },
});

// export const { todoAdded, todoToggled } = taskSlice.actions;
export default taskSlice.reducer;
