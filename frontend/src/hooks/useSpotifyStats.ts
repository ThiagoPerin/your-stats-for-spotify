import { useQuery } from "@tanstack/react-query";
import { ApiError, UserServices } from "@/services/userServices";

// Spotify caps top items at 50 per request
export const TOP_ITEMS_LIMIT = 50;

// An expired session won't fix itself, so don't retry 401s
const retry = (failureCount: number, error: Error) =>
    !(error instanceof ApiError && error.status === 401) && failureCount < 2;

const staleTime = 5 * 60 * 1000;

export function useUserProfile(sessionId: string) {
    return useQuery({
        queryKey: ["spotify", sessionId, "user"],
        queryFn: () => UserServices.fetchUserProfile(sessionId),
        enabled: !!sessionId,
        retry,
        staleTime,
    });
}

export function useTopArtists(sessionId: string, limit = TOP_ITEMS_LIMIT) {
    return useQuery({
        queryKey: ["spotify", sessionId, "top-artists", limit],
        queryFn: () => UserServices.fetchUserTopArtists(sessionId, limit),
        enabled: !!sessionId,
        retry,
        staleTime,
    });
}

export function useTopTracks(sessionId: string, limit = TOP_ITEMS_LIMIT) {
    return useQuery({
        queryKey: ["spotify", sessionId, "top-tracks", limit],
        queryFn: () => UserServices.fetchUserTopTracks(sessionId, limit),
        enabled: !!sessionId,
        retry,
        staleTime,
    });
}
