import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../entities/users/api/authApi";

export const useRefreshTokens = () => {
    const { data, status } = useMutation({
        mutationFn: () => authApi.refreshTokens(),
        retry: false,
    });

    return { data, status }
}