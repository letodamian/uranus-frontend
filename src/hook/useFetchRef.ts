import { useQuery } from "@tanstack/react-query";
import { getRefData } from "../lib/api";
import { useUser } from "./useUser";

export const useFetchRef = () => {
    const user = useUser();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getRefData', user?.userId],
        queryFn: () => getRefData(user?.userId),
        refetchInterval: 1000
    })

    return {
        data, isLoading, refetch
    }
}