import { createTask } from "@/lib/slice/taskSlice";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
const AddNewTask = (props) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
  });
  const dispatch = useDispatch();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "taskName":
        setFormData({ ...formData, taskName: value });
        break;
      case "description":
        setFormData({ ...formData, description: value });
        break;

      default:
        break;
    }
  };

  const submitHandler = () => {
    if (formData.description && formData.taskName) {
      setLoading(true);
      dispatch(createTask(formData))
        .then(unwrapResult)
        .then((res) => {
          toast.success(res.message || "Task added successfully", {
            position: "top-right",
            theme: "dark",
          });
          setLoading((prevState) => !prevState);
          props.closeModal();
        })
        .catch((err) => {
          toast.error(err.message || "Signin failed", {
            position: "top-right",
            theme: "dark",
          });
          setLoading((prevState) => !prevState);
        });
    }
  };

  return (
    <Dialog
      fullWidth={true}
      open={props.open}
      onClose={props.closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle id="alert-dialog-title">Add new task</DialogTitle>
        <IconButton sx={{ marginRight: "8px" }} onClick={props.closeModal}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <DialogContent sx={{ marginTop: "8px" }}>
        <Paper elevation={0}>
          <Stack gap={2}>
            <TextField
              id="taskName"
              type="text"
              name="taskName"
              label="Task Name"
              placeholder="Task Name"
              value={formData.taskName}
              onChange={inputHandler}
              fullWidth
              autoFocus
            />
            <TextField
              rows={3}
              multiline
              id="description"
              type="description"
              name="description"
              label="Description"
              placeholder="Description"
              value={formData.description}
              onChange={inputHandler}
              fullWidth
            />
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
              <Button
                variant="contained"
                sx={{ marginTop: ".5rem" }}
                onClick={submitHandler}
              >
                Add Task
              </Button>
            )}
          </Stack>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTask;
