import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  putActivity,
  fetchActivities,
  postActivity,
  removeActivity,
  getActivityById,
} from "../api/services";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";

export function useActivities(id?: string) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { currentUser } = useAccount();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: location.pathname === "/activities" && !id && !!currentUser, // Only run this query if on the home page
    select: (data) => {
      return data.map((activity) => ({
        ...activity,
        isHost: activity.hostId === currentUser?.id,
        isGoing: activity.attendees.some(
          (attendee) => attendee.id === currentUser?.id
        ),
      }));
    },
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: () => getActivityById(id!),
    enabled: !!id && !!currentUser, // Only run this query if id is defined
    select: (data) => {
      return {
        ...data,
        isHost: data.hostId === currentUser?.id,
        isGoing: data.attendees.some(
          (attendee) => attendee.id === currentUser?.id
        ),
      };
    },
  });

  const updateActivity = useMutation({
    mutationFn: putActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const createActivity = useMutation({
    mutationFn: postActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: removeActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return {
    activities,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
}
