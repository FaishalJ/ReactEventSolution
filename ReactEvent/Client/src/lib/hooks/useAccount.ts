import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, login, logOut, register } from "../api/services";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const registerUser = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Registered successfully - you can now login");
      navigate("/login");
    },
  });

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const logOutUser = useMutation({
    mutationFn: logOut,
    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: ["user"],
      });
      queryClient.removeQueries({
        queryKey: ["activities"],
      });
      await navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled:
      !queryClient.getQueryData(["user"]) &&
      location.pathname !== "/login" &&
      location.pathname !== "/register",
  });

  return { loginUser, logOutUser, currentUser, loadingUserInfo, registerUser };
};
