import { useRegisterData } from "../api/useRegisterData"
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { type RegisterUserDto } from "../../../entities/users/api/authApi";
import './RegisterPage.module.css';
import { NavLink } from "react-router";

export function RegisterPage() {

    const navigate = useNavigate();

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
            return navigate('/login');
        } catch {
            return navigate('/');
        }
    }

    return (
        <div className="container-for-register">
            <div className="register">
                <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
                    <h1>Добро пожаловать в Task-Manager!</h1>
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
                    <button className='reg-btn' disabled={!isValid} type="submit">Sign up</button>
                    <div className="flex-or">
                        <div className="around-line"></div>
                        <p className="centre-or">OR</p>
                        <div className="around-line"></div>
                    </div>
                    <NavLink to={'/login'}><button className='reg-btn' type="submit">Log in</button></NavLink>
                </form>
            </div>
        </div>
    )
}

