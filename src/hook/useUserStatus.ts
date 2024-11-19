
import { useQuery } from "@tanstack/react-query";
import { fetchUserStatus } from "../lib/api";
import { useUser } from "./useUser";

export const useUserStatus = () => {
    const user = useUser();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['fetchUserStatus', user?.userId],
        queryFn: () => fetchUserStatus(user?.userId),
        refetchInterval: 1000
    })

    return {
        data, isLoading, refetch
    }
}