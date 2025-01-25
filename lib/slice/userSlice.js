import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// api call

export const signInUser = createAsyncThunk(
  "users/signInUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "login",
        data: { email: formData.email, password: formData.password },
      });
      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data);
    }
  }
);
export const checkAuth = createAsyncThunk(
  "users/checkAuth",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + "check-auth",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    isLogin: false,
    loading: true,
  },
  reducers: {
    logoutUser(state) {
      state.isLogin = false;
      state.user = {};
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLogin = true;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLogin = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.isLogin = false;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
