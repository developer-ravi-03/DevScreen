import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
  const userData = useQuery(api.users.getCurrentUser);

  const isLoading = userData === undefined;

  return {
    isLoading,
    user: userData,
    role: userData?.role,
    isInterviewer: userData?.role === "interviewer",
    isCandidate: userData?.role === "candidate",
    needsRoleSelection: userData?.roleSelected === false,
  };
};