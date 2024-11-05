import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../lib/api";

export const useUserData = (userName: string | undefined) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchUserData", userName],
    queryFn: () => fetchUserData(userName),
    refetchInterval: 60000,
    enabled: !!userName, // Only fetch if 'userName' is defined (truthy)
  });

  return { data, isLoading, refetch };
};