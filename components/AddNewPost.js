import { createPost } from "@/lib/slice/postSlice";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const AddNewPost = (props) => {
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("caption", caption);
    setLoading(true);
    dispatch(createPost(formData))
      .then(unwrapResult)
      .then((res) => {
        toast.success(res.message || "Post added successfully", {
          position: "top-right",
          theme: "dark",
        });
        setLoading((prevState) => !prevState);
        setSelectedImage(null);
        props.hidePost();
      })
      .catch((err) => {
        toast.error(err.message || "failed", {
          position: "top-right",
          theme: "dark",
        });
        setLoading((prevState) => !prevState);
      });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the File object for upload

      // Optional: For image preview (base64), use FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result); // Save base64 string for preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={0} sx={{ padding: "1rem", marginTop: "1rem" }}>
      <Stack gap={2}>
        <TextField
          id="caption"
          type="text"
          name="caption"
          label="Caption"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          fullWidth
        />
        <TextField
          id="imageURL"
          type="file"
          name="imageURL"
          // value={selectedImage}
          fullWidth
          autoFocus
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewImage && (
          <Box
            component="img"
            src={previewImage}
            alt="upload-image"
            style={{ maxWidth: "300px" }}
          />
        )}

        {loading ? (
          <Stack
            my={2}
            direction="row"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Stack gap={2} direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ marginTop: ".5rem" }}
              onClick={submitHandler}
            >
              Add Post
            </Button>
            <Button
              variant="outlined"
              sx={{ marginTop: ".5rem" }}
              onClick={props.hidePost}
            >
              Hide
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default AddNewPost;
