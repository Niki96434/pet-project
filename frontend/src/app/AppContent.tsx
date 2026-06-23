import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from 'react-router';
import { NavBar, SideBar } from '../widgets/header';
import { useState } from 'react';
import { useTheme } from './../shared/lib/hooks/useTheme';
import './AppContent.module.css';
import './themes.css';


function AppContent() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { theme } = useTheme();

    return (
        <div className={`page_theme_${theme}`}>
            <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className='sidebar-and-content'>
                <SideBar isActive={isMenuOpen} />
                <div className={`${isMenuOpen ? 'outlet-flex-right' : 'outlet-flex-left'}`}>
                    <Outlet />
                    <Toaster />
                </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    )
}

export { AppContent }