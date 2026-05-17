import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "../shared/lib/ui/toaster";
import { Outlet } from 'react-router';
import { NavBar, SideBar } from '../widgets/header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './AppLayout.css';
import { useState } from 'react';

const queryClient = new QueryClient();

function AppLayout() {
  const [isActive, setMenuActive] = useState<boolean>(false);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_gmailCLientID}>
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
    </GoogleOAuthProvider>
  )
}

export default AppLayout

// https://github.com/MomenSherif/react-oauth/blob/master/packages/@react-oauth/google/README.md
// https://console.cloud.google.com/apis/credentials?hl=ru&project=vaulted-blend-471906-v7
// https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages?hl=ru