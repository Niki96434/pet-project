import { useRegisterData } from "../api/useRegisterData"
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { type RegisterUserDto } from "../../../entities/users/api/authApi";
import styles from './RegisterForm.module.css';
import { NavLink } from "react-router";

export function RegisterForm() {

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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Добро пожаловать в <br />  Task-Manager!</h1>
                <input id="username" placeholder="Username" required {...register("username", {
                    required: 'Поле обязательно должно быть заполнено'
                })} />
                {errors.username && <span>{errors.username.message} *</span>}
                <input id="password" type="password" placeholder="Password" required {...register("password", {
                    required: 'Поле обязательно должно быть заполнено',
                    minLength: {
                        value: 6,
                        message: 'Минимум 6 символов'
                    }
                })} />
                {errors.password && <span>{errors.password.message} *</span>}
                <input id="confirmPassword" type="password" placeholder="Confirm password" required {...register("confirmPassword", {
                    required: 'Обязательно должно быть заполнено',
                    minLength: {
                        value: 6,
                        message: 'Минимум 6 символов'
                    },
                    validate: (value) => value === getValues('password') || 'Пароли не совпадают'
                })} />
                {errors.confirmPassword && <span>{errors.confirmPassword.message} *</span>}
                <button className={styles.btn} disabled={!isValid} type="submit">Зарегистрироваться</button>
                <div className={styles.or}>
                    <div className={styles.line}></div>
                    <p className={styles.center}>OR</p>
                    <div className={styles.line}></div>
                </div>
                <div>Уже зарегистрировались? <NavLink to={'/login'}><strong>Войти</strong></NavLink></div>
            </form>
        </div>
    )
}

