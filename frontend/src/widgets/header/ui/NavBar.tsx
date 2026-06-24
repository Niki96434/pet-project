"use client"
import './NavBar.css';
import menuIcon from './../../../assets/menu.svg';
import { ThemeToggler } from '../../../features/add-theme';

interface NavBarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (arg: boolean) => void;
}

export function NavBar({ isMenuOpen, setIsMenuOpen }: NavBarProps) {

    return (
        <nav className='nav-bar'>
            <img className='burger-button' src={menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)} alt='menu' />
            <ThemeToggler />
        </nav>
    )
}
