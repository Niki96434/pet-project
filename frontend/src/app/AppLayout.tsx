import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from 'react-router';
import { NavBar, SideBar } from '../widgets/header';
import './AppLayout.css';

const queryClient = new QueryClient();

function AppLayout() {
  return (
    <div className='spa-layout'>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <div className='sidebar-and-content'>
          <SideBar />
          <div className='outlet-style'>
            <Outlet />
            <Toaster />
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  )
}

export default AppLayout
