import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    TActivity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const getActivities = async () => {
      const { data } = await axios.get<TActivity[]>(
        "https://localhost:5001/api/activities/"
      );
      setActivities(data);
    };
    getActivities();
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
    setEditMode(false);
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: TActivity) => {
    if (activity.id) {
      setActivities(
        activities.map((a) => (a.id === activity.id ? activity : a))
      );
    } else {
      const newActivity = { ...activity, id: crypto.randomUUID() };
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  );
}

export default App;
