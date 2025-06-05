import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: TActivity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity?: TActivity;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  submitForm: (activity: TActivity) => void;
  deleteActivity: (id: string) => void;
}
export default function ActivityDashboard({
  activities,
  selectActivity,
  cancelSelectActivity,
  selectedActivity,
  editMode,
  openForm,
  closeForm,
  submitForm,
  deleteActivity,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            submitForm={submitForm}
          />
        )}
      </Grid>
    </Grid>
  );
}
