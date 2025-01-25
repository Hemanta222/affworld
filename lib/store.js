import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./slice/postSlice";
import userReducer from "./slice/userSlice";
import taskReducer from "./slice/taskSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    tasks: taskReducer,
    posts: postReducer,
  },
});
