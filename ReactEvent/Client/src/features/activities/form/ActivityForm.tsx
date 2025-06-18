import { useForm } from "react-hook-form";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useEffect } from "react";
import {
  activitySchema,
  type TActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";

export default function ActivityForm() {
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  const { control, reset, handleSubmit } = useForm<TActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });

  useEffect(
    function () {
      if (activity) {
        reset(activity);
      }
    },
    [activity, reset]
  );

  const onSubmit = (data: TActivitySchema) => {
    console.log(data);
  };

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextInput label="Title" control={control} name="title" />
        <TextInput
          label="Description"
          control={control}
          name="description"
          multiline
          rows={3}
        />
        <TextInput label="Category" control={control} name="category" />
        <TextInput label="Date" control={control} name="date" />
        <TextInput label="City" control={control} name="city" />
        <TextInput label="Venue" control={control} name="venue" />

        <Box display="flex" gap={3} justifyContent="end">
          <Button color="inherit">Cancel</Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
