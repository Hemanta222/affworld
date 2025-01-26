import {
  Box,
  Collapse,
  Container,
  Fab,
  Grid2,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewPost from "../../components/AddNewPost";

import Post from "../../components/Post";
import { getPosts } from "@/lib/slice/postSlice";
import CommonContainer from "@/components/CommonContainer";
const Posts = () => {
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const { loading, allPosts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openForm = () => {
    setShowAddForm(true);
  };
  const closeForm = () => {
    setShowAddForm(false);
  };
  console.log("showAddForm", showAddForm);
  if (!loading && !allPosts.length) {
    return (
      <CommonContainer title="Affworl - Feeds">
        <Container maxWidth={"md"}>
          <Paper
            sx={{
              padding: "1rem 2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">#POSTS</Typography>
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              onClick={openForm}
            >
              <AddOutlinedIcon sx={{ mr: 1 }} />
              Add Post
            </Fab>
          </Paper>
          <Collapse orientation="vertical" in={showAddForm} collapsedSize={0}>
            <AddNewPost hidePost={closeForm} />
          </Collapse>
          <Box
            component="img"
            alt="no_posts"
            src="/no-feeds.jpg"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
          />
        </Container>
      </CommonContainer>
    );
  }
  if (loading) {
    return (
      <CommonContainer title="Affworl - Feeds">
        <Container maxWidth={"md"}>
          <Stack gap={2}>
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
            <Skeleton variant="rectangular" width={"100%"} height={60} />
          </Stack>
        </Container>
      </CommonContainer>
    );
  }
  return (
    <CommonContainer title="Affworl - Feeds">
      <Paper
        sx={{
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">#POSTS</Typography>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={openForm}
        >
          <AddOutlinedIcon sx={{ mr: 1 }} />
          Add Post
        </Fab>
      </Paper>
      <Collapse orientation="vertical" in={showAddForm} collapsedSize={0}>
        <AddNewPost hidePost={closeForm} />
      </Collapse>

      <Paper
        className="transparentBox"
        sx={{
          padding: "1rem",
          marginTop: "1rem",
          backgroundColor: "transparent",
        }}
      >
        <Grid2 container spacing={1}>
          {allPosts.map((post) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 3 }} key={post._id}>
              <Post post={post} />
            </Grid2>
          ))}
        </Grid2>
      </Paper>
    </CommonContainer>
  );
};

export default Posts;
