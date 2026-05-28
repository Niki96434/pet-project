import { useLoginData } from "../api/useLoginData";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { type RegisterUserDto } from "../../../entities/users/api/authApi";
import './LoginPage.css';

export function LoginPage() {

    const navigate = useNavigate();

    const loginData = useLoginData();

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
            await loginData.mutateAsync(data);
            return navigate('/home');
        } catch {
            return navigate('/register');
        }
    }

    return (
        <>
            <h1>Войдите в свой профиль</h1>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <input id="username" placeholder="Username" required {...register("username", {
                    required: 'Поле обязательно должно быть заполнено'
                })} />
                {errors.username && <span>* {errors.username.message}</span>}
                <input id="password" type="password" placeholder="Password" required {...register("password", {
                    required: 'Обязательно должно быть заполнено',
                    minLength: {
                        value: 6,
                        message: 'Минимум 6 символов'
                    }
                })} />
                {errors.password && <span>* {errors.password.message}</span>}
                <input id="confirmPassword" type="password" placeholder="Confirm password" required {...register("confirmPassword", {
                    required: 'Обязательно должно быть заполнено',
                    minLength: {
                        value: 6,
                        message: 'Минимум 6 символов'
                    },
                    validate: (value) => value === getValues('password') || 'Пароли не совпадают'
                })} />
                {errors.confirmPassword && <span>* {errors.confirmPassword.message}</span>}
                <button className='log-btn' disabled={!isValid} type="submit">Sign up</button>
            </form>
        </>
    )
}

