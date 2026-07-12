"use client"
import styles from './NavBar.module.css';
import { ThemeToggler } from '../../../core/theme/ThemeToggler';
import UserCard from '../../../entities/users/ui/UserCard';
import DropdownButton from '../../../shared/ui/DropdownButton';
import { useAuth } from '../../../shared/model/useAuth';

export function NavBar() {
    const { isAuth, setIsAuth } = useAuth();

    return (
        <nav className={styles.container}>
            {isAuth && <UserCard />}
            {isAuth && <DropdownButton setIsAuth={setIsAuth} />}
            <ThemeToggler />
        </nav>
    )
}
