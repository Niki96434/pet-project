import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from 'react-router';
import { NavBar, SideBar } from '../widgets/header';
import './AppLayout.css';
import { useState } from 'react';

const queryClient = new QueryClient();

function AppLayout() {
  const [isActive, setMenuActive] = useState<boolean>(false);
  return (
    <QueryClientProvider client={queryClient}>
      <div className='spa-layout'>
        <NavBar isActive={isActive} setMenuActive={setMenuActive} />
        <div className='sidebar-and-content'>
          <SideBar isActive={isActive} />
          <div className={`${isActive ? 'outlet-flex-right' : 'outlet-flex-left'}`}>
            <Outlet />
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  )
}

export default AppLayout
