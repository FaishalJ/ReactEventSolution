import { AccessTime, Place } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { formatDate } from "../../../lib/utils";
import AvatarPopover from "../../../app/shared/components/AvatarPopOver";

interface Props {
  activity: TActivity;
}
export default function ActivityCard({ activity }: Props) {
  const navigate = useNavigate();

  // const isHost = false;
  // const isGoing = false;
  const label = activity.isHost ? "You are hosting" : "You are going";
  // const isCancelled = false;
  const color = activity.isHost
    ? "secondary"
    : activity.isGoing
    ? "warning"
    : "default";
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{ fontWeight: "bold", fontSize: 20 }}
          subheader={
            <>
              Hosted by{""}{" "}
              <Link to={`/profiles/${activity.hostId}`}>
                {activity.hostDisplayName}
              </Link>
            </>
          }
        />

        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(activity.isHost || activity.isGoing) && (
            <Chip
              variant="outlined"
              label={label}
              color={color}
              sx={{ borderRadius: 2 }}
            />
          )}
          {activity.isCancelled && (
            <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <Box display="flex" flexGrow={0} alignItems="center">
            <AccessTime sx={{ mr: 1 }} />
            <Typography variant="body2" noWrap>
              {formatDate(activity.date)}
            </Typography>
          </Box>

          <Place sx={{ ml: 3, mr: 1 }} />
          <Typography variant="body2">{activity.venue}</Typography>
        </Box>

        <Divider />

        <Box
          display="flex"
          gap={2}
          sx={{ backgroundColor: "grey.200", py: 3, pl: 3 }}
        >
          {activity.attendees.map((attendee) => (
            <AvatarPopover profile={attendee} key={attendee.id} />
          ))}
        </Box>
      </CardContent>

      <CardContent
        sx={{ pb: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="body2">{activity.description}</Typography>

        <Button
          onClick={() => navigate(`/activities/${activity.id}`)}
          size="medium"
          variant="contained"
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
