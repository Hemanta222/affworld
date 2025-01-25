import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/lib/slice/taskSlice";
import { toast } from "react-toastify";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { unwrapResult } from "@reduxjs/toolkit";
export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleConfirmDelete = () => {
    setShowAlert((prevState) => !prevState);
  };
  const deleteTaskHandler = () => {
    setLoading(true);
    dispatch(deleteTask(props.task._id))
      .then(unwrapResult)
      .then((res) => {
        toast.success(res.message || "Task removed successfully", {
          position: "top-right",
          theme: "dark",
        });
        toggleConfirmDelete();
        setLoading((prevState) => !prevState);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to remove", {
          position: "top-right",
          theme: "dark",
        });
        toggleConfirmDelete();
        setLoading((prevState) => !prevState);
      });
  };

  return (
    <Card
      elevation={1}
      variant="outlined"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ cursor: "move",":hover":{outline:'2px solid #eee'} }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
      >
        <Typography>{props.task.taskName}</Typography>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the drag-and-drop listeners from capturing the event
            toggleConfirmDelete();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      {showAlert && (
        <Dialog
          open={showAlert}
          onClose={toggleConfirmDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to remove the task :{" "}
              <span style={{ fontWeight: "bold" }}>{props.task.taskName}</span>
            </DialogContentText>
          </DialogContent>
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
            <Stack
              my={2}
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Button
                onClick={toggleConfirmDelete}
                variant="contained"
                color="error"
              >
                No
              </Button>
              <Button
                onClick={deleteTaskHandler}
                variant="contained"
                autoFocus
                color="success"
              >
                Yes
              </Button>
            </Stack>
          )}
        </Dialog>
      )}
    </Card>
  );
}
