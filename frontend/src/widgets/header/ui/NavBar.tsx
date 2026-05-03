"use client"
import './NavBar.css';
import menuIcon from './../../../assets/menu.svg';

interface NavBarProps {
    isActive: boolean;
    setMenuActive: (arg: boolean) => void;
}

export function NavBar({ isActive, setMenuActive }: NavBarProps) {
    return (
        <nav className='nav-bar'>
            <img className='burger-button' src={menuIcon} onClick={() => setMenuActive(!isActive)} />
        </nav>
    )
}
