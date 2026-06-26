// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from 'react-router';
import { NavBar, SideBar } from '../widgets/header';
import { useTheme } from './../shared/lib/hooks/useTheme';
import './AppContent.css';
import './styles/index.css';

function AppContent() {
    const { theme } = useTheme();

    return (
        <div className={`page_theme_${theme}`}>
            <NavBar />
            <div className='sidebar-and-content'>
                <SideBar />
                <div className='content'>
                    <Outlet />
                    <Toaster />
                </div>
            </div>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </div>
    )
}

export { AppContent }