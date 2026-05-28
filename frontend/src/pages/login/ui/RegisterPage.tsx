import { useRegisterData } from "../api/useRegisterData"
import { redirect } from "react-router";
import { useForm } from "react-hook-form";
import { type RegisterUserDto } from "../../../entities/users/api/authApi";
import './RegisterPage.css';

export function RegisterPage() {

    const registerData = useRegisterData();

    const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm<RegisterUserDto>({
        values: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        delayError: 500,
        mode: 'onChange'
    });

    const onSubmit = async (data: RegisterUserDto) => {
        try {
            await registerData.mutateAsync(data);
            return redirect('/home');
        } catch {
            return redirect('/register');
        }
    }

    return (
        <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input id="username" required {...register("username", {
                required: 'Поле обязательно должно быть заполнено'
            })} />
            {errors.username && <span>* {errors.username.message}</span>}
            <label htmlFor="password">Password (min. 6 characters)</label>
            <input id="password" type="password" required {...register("password", {
                required: 'Обязательно должно быть заполнено',
                minLength: {
                    value: 6,
                    message: 'Минимум 6 символов'
                }
            })} />
            {errors.password && <span>* {errors.password.message}</span>}
            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" required {...register("confirmPassword", {
                required: 'Обязательно должно быть заполнено',
                minLength: {
                    value: 6,
                    message: 'Минимум 6 символов'
                },
                validate: () => {
                    const password = getValues('password');
                    const confirmPassword = getValues('confirmPassword');
                    return password === confirmPassword || 'Пароли не совпадают'
                }
            })} />
            {errors.confirmPassword && <span>* {errors.confirmPassword.message}</span>}
            <button disabled={!isValid} type="submit">Save</button>
        </form>
    )
}

