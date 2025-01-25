import { useDroppable } from "@dnd-kit/core";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${props.id}`,
  });
  const style = {
    border: isOver ? "1px solid green" : undefined,
  };

  return (
    <Grid2 size={4} ref={setNodeRef} style={style} >
      <Card elevation={0} variant="outlined" sx={{ height: "100%" }}>
        <CardContent>
          <Typography textAlign="center" gutterBottom variant="h6">
            {props.id}
          </Typography>
          <Divider />
        </CardContent>
        <Stack gap={2} sx={{ padding: "1rem" }}>
          {props.children}
        </Stack>
      </Card>
    </Grid2>
  );
}
