import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from 'react-router';
import { NavBar, SideBar } from '../widgets/header';
import './AppLayout.css';
import { useState } from 'react';
import './themes.css';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`spa-layout page_theme_light`}>
        <ThemeProvider>
          <NavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className='sidebar-and-content'>
            <SideBar isActive={isMenuOpen} />
            <div className={`${isMenuOpen ? 'outlet-flex-right' : 'outlet-flex-left'}`}>
              <Outlet />
              <Toaster />
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </div>
    </QueryClientProvider>
  )
}

export default AppLayout
