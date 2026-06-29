import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../../entities/users/api/authApi";

export const useLogout = () => {
    const { status } = useMutation({
        mutationFn: () => authApi.logout(),
    });

    return { status }
}