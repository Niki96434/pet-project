import { useLoginData } from "../api/useLoginData";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { type RegisterUserDto } from "../../../entities/users/api/authApi";
import './LoginPage.module.css';
import { NavLink } from 'react-router';
import { setCredentials, useUserStore } from "../model/useUserStore";
import { useAuthStore, login } from "../model/useAuthStore";

export function LoginPage() {

    const navigate = useNavigate();

    const loginData = useLoginData();

    const setCreds = useUserStore(setCredentials);
    const isAuth = useAuthStore(login);

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
            const { user: { id, username } } = await loginData.mutateAsync(data);
            if (id && username.trim() !== '') {
                setCreds(id, username);
                isAuth(id);
                return navigate('/home');
            } else {
                return navigate('/login');
            }
        } catch {
            return navigate('/');
        }
    }

    return (
        <div className="container-for-register">
            <div className="register">
                <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Вход в профиль</h1>
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
                    <button className='reg-btn' disabled={!isValid} type="submit">Log in</button>
                    <div className="flex-or">
                        <div className="around-line"></div>
                        <p className="centre-or">OR</p>
                        <div className="around-line"></div>
                    </div>
                    <NavLink to={'/'}><button className='reg-btn' type="submit">Sign up</button></NavLink>
                </form>
            </div>
        </div>
    )
}

