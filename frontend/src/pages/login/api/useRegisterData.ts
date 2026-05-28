import { useMutation } from "@tanstack/react-query"
import { authApi } from "../../../entities/users/api/authApi"
import { type RegisterUserDto } from "../../../entities/users/api/authApi"

export function useRegisterData() {

    const registerData = useMutation({
        mutationFn: (credentials: RegisterUserDto) => authApi.register(credentials),
        onSuccess: () => console.log('успешная регистрация'),
        onError: () => console.log('ошибка регистрации')
    });

    return registerData
}

