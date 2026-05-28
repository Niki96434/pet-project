import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../../entities/users/api/authApi"
import { type RegisterUserDto } from "../../../entities/users/api/authApi"
import { toaster } from "../../../shared/lib/ui/toaster";

export function useLoginData() {

    const registerData = useMutation({
        mutationFn: (credentials: RegisterUserDto) => authApi.login(credentials),
        onSuccess: () => {
            toaster.create({
                title: 'Поздравляю, вход прошел успешно',
                type: 'success',
            });
        },
        onError: () => {
            toaster.create({
                title: 'Не удалось войти',
                type: 'error',
            });
        }
    });

    return registerData
}

