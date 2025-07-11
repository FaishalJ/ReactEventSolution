import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";

import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";

import { useActivities } from "../../../lib/hooks/useActivities";
import {
  activitySchema,
  type TActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateActivity, createActivity, activity, isLoadingActivity } =
    useActivities(id);

  const { control, reset, handleSubmit } = useForm<TActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });

  useEffect(
    function () {
      if (activity) {
        reset({
          ...activity,
          location: {
            city: activity.city,
            venue: activity.venue,
            latitude: activity.latitude,
            longitude: activity.longitude,
          },
        });
      }
    },
    [activity, reset]
  );

  const onSubmit = (data: TActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = { ...rest, ...location } as TActivity;
    try {
      if (activity) {
        updateActivity.mutate(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => navigate(`/activities/${activity.id}`),
          }
        );
      } else {
        createActivity.mutate(flattenedData, {
          onSuccess: (id) => navigate(`/activities/${id}`),
        });
      }
    } catch (error) {
      console.log(error);
    }
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

        <Box display="flex" gap={3}>
          <SelectInput
            label="Category"
            control={control}
            name="category"
            items={categoryOptions}
          />
          <DateTimeInput label="Date" control={control} name="date" />
        </Box>

        <LocationInput
          control={control}
          name="location"
          label="Enter the location"
        />

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
