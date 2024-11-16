import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardData } from "../lib/api";
import { useUser } from "./useUser";

export const useFetchLeaderBoard = () => {
    const user = useUser();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getLeaderBoardData', user?.userId],
        queryFn: () => getLeaderBoardData(user?.userId),
        refetchInterval: 1000
    })

    return {
        data, isLoading, refetch
    }
}