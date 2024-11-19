import { useQuery } from "@tanstack/react-query";
import { fetchUserStatus } from "../lib/api";

export const useUserStatus = (userId: string | undefined) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchUserStatus", userId],
    queryFn: () => fetchUserStatus(userId),
    refetchInterval: 5000,
    enabled: !!userId, // Only fetch if 'userName' is defined (truthy)
  });
  console.log(data,"GGGGGGGGGGGGGGDCS");
  return { data, isLoading, refetch };
};