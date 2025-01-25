"use client";
import React from "react";
import { Grid2 } from "@mui/material";
import { SortableItem } from "./SortableItem";
import { Droppable } from "./Droppable";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "@/lib/slice/taskSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

function TaskList() {
  const { allTasks } = useSelector((state) => state.tasks);
  const statuses = ["Pending", "Completed", "Done"];
  const dispatch = useDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // Small drag threshold to differentiate from click
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      dispatch(updateTaskStatus({ taskId: active.id, status: over.id }))
        .then(unwrapResult)
        .then((res) => {
          toast.success(res.message || "Status updated successfully", {
            position: "top-right",
            theme: "dark",
          });
        })
        .catch((err) => {
          toast.error(err.message || "Failed to update status", {
            position: "top-right",
            theme: "dark",
          });
        });
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Grid2 container spacing={2} paddingY={2}>
        {statuses.map((status) => (
          <Droppable key={status} id={status}>
            <SortableContext
              items={allTasks.filter((task) => task.status === status)}
              strategy={horizontalListSortingStrategy}
            >
              {allTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <SortableItem key={task._id} id={task._id} task={task} />
                ))}
            </SortableContext>
          </Droppable>
        ))}
      </Grid2>
    </DndContext>
  );
}

export default TaskList;
