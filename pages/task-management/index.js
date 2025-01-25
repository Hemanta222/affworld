"use client";
import AddNewTask from "@/components/AddNewTask";
import CommonContainer from "@/components/CommonContainer";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/lib/slice/taskSlice";
import { Fab, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TaskManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setshowModal] = useState(false);
  const closeModal = () => {
    setshowModal(!showModal);
  };
  const openModal = () => {
    setshowModal(true);
  };

  return (
    <CommonContainer title="Affworl - Task management">
      {showModal ? (
        <AddNewTask open={showModal} closeModal={closeModal} />
      ) : null}
      <Stack
        component={Paper}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Typography variant="h6" sx={{ fontWeight: 500, marginLeft: "1rem" }}>
          Task Management
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          onClick={openModal}
          variant="extended"
          sx={{ marginRight: "1rem" }}
        >
          <AddIcon /> Add New Task
        </Fab>
      </Stack>

      <TaskList />
    </CommonContainer>
  );
};

export default TaskManagement;
