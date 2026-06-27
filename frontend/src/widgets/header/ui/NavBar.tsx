"use client"
import styles from './NavBar.module.css';
import { ThemeToggler } from '../../../features/add-theme';

export function NavBar() {
    return (
        <nav className={styles.container}>
            <ThemeToggler />
        </nav>
    )
}
