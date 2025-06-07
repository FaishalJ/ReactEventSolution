import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  putActivity,
  fetchActivities,
  postActivity,
  removeActivity,
  getActivityById,
} from "../api/services";
import { useLocation } from "react-router";

export function useActivities(id?: string) {
  const queryClient = useQueryClient();
  const location = useLocation();

  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: fetchActivities,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    enabled: location.pathname === "/activities" && !id, // Only run this query if on the home page
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: () => getActivityById(id!),
    enabled: !!id, // Only run this query if id is defined
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
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
}
