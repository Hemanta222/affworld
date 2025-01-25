import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + "post/get-posts",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.posts;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.NEXT_PUBLIC_API_URL + "post/create-post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const postSlice = createSlice({
  name: "posts",
  initialState: { allPosts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.allPosts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.allPosts = [action.payload.post, ...state.allPosts];
    });
  },
});

// export const { todoAdded, todoToggled } = postSlice.actions;
export default postSlice.reducer;
