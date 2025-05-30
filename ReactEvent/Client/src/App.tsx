import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState<TActivity[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      const { data } = await axios.get<TActivity[]>(
        "https://localhost:5001/api/activities/"
      );
      setActivities(data);
    };
    getActivities();
  }, []);

  return (
    <>
      <Typography variant="h3">React event</Typography>
      <List>
        {activities.length > 0 &&
          activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  );
}

export default App;
