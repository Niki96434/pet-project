import { useLoginData } from "../api/useLoginData";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { type LoginUserDto } from "../../../entities/users/api/authApi";
import styles from './LoginForm.module.css';
import { NavLink } from 'react-router';
import { type UserState, useUserStore } from "../model/useUserStore";
import { useAuth } from "../../../shared/model/useAuth";
import { queryClient } from "../../../shared/api/queryClient";

export function LoginForm() {

    const navigate = useNavigate();

    const loginUser = useLoginData();

    const setCreds = useUserStore((state: UserState) => state.setCredentials);
    const { setIsAuth } = useAuth();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginUserDto>({
        values: {
            username: '',
            password: '',
        },
        delayError: 500,
        mode: 'onChange'
    });

    const onSubmit = async (data: LoginUserDto) => {
        try {
            const { id, name, accessToken } = await loginUser.mutateAsync(data);
            if (!accessToken || accessToken.trim() === '') {
                return navigate('/login');
            }
            localStorage.setItem('accessToken', accessToken);

            setCreds(id, name);
            setIsAuth(true);

            queryClient.invalidateQueries({ queryKey: ['tasks'] });

            return navigate('/home');
        } catch {
            return navigate('/register');
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Вход в профиль</h1>
                <input id="username" placeholder="Username" required {...register("username", {
                    required: 'Поле обязательно должно быть заполнено'
                })} />
                {errors.username && <span>{errors.username.message} *</span>}
                <input id="password" type="password" placeholder="Password" required {...register("password", {
                    required: 'Обязательно должно быть заполнено',
                    minLength: {
                        value: 6,
                        message: 'Минимум 6 символов'
                    }
                })} />
                {errors.password && <span>{errors.password.message} *</span>}
                <button className={styles.btn} disabled={!isValid} type="submit">Вход</button>
                <div className={styles.or}>
                    <div className={styles.line}></div>
                    <p className={styles.center}>или</p>
                    <div className={styles.line}></div>
                </div>
                <div>Еще не зарегистрировались? <NavLink to={'/register'}><strong>Зарегистрироваться</strong></NavLink></div>
            </form>
        </div>
    )
}

