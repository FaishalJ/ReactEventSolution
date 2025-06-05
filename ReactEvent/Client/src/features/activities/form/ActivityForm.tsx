import { Box, Button, Paper, TextField, Typography } from "@mui/material";

interface Props {
  closeForm: () => void;
  activity?: TActivity;
  submitForm: (activity: TActivity) => void;
}

export default function ActivityForm({
  closeForm,
  activity,
  submitForm,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) data.id = activity.id;
    submitForm(data as unknown as TActivity);
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {" "}
        Create activity
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField label="Title" name="title" defaultValue={activity?.title} />
        <TextField
          label="Description"
          name="description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          label="Category"
          name="category"
          defaultValue={activity?.category}
        />
        <TextField
          label="Date"
          name="date"
          defaultValue={activity?.date}
          type="date"
        />
        <TextField label="City" name="city" defaultValue={activity?.city} />
        <TextField label="Venue" name="venue" defaultValue={activity?.venue} />

        <Box display="flex" gap={3} justifyContent="end">
          <Button onClick={closeForm} color="inherit">
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
