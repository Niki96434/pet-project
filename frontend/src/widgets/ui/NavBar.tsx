"use client"
import styles from './NavBar.module.css';
import { ThemeToggler } from '../../core/theme/ThemeToggler';
import UserCard from '../../entities/users/ui/UserCard';
import DropdownButton from '../../shared/ui/DropdownButton';
import { useAuthStore } from '../../shared/model/useAuthStore';

export function NavBar() {
    const { logout } = useAuthStore((state) => state.actions);
    const { context: { username, isAuth } } = useAuthStore((state) => state);

    return (
        <nav className={styles.container}>
            {isAuth &&
                <>
                    <UserCard initial={username[0]} />
                    <DropdownButton logout={logout} />
                </>
            }
            <ThemeToggler />
        </nav>
    )
}
