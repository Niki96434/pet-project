"use client"
import './NavBar.css';
import { ThemeToggler } from '../../../features/add-theme';

export function NavBar() {

    return (
        <nav className='nav-bar'>
            <ThemeToggler />
        </nav>
    )
}
