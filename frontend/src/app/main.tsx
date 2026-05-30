import { createRoot } from 'react-dom/client'
import AppLayout from './AppLayout';
import { Provider } from '../shared/lib/ui/provider';
import { BrowserRouter, Routes, Route } from 'react-router';
import { RegisterPage } from '../pages/login';
import { TasksPage } from '../pages/tasks-page';
import { LoginPage } from '../pages/login';
import { ProtectedRoutes } from './providers/ProtectedRoutes';

createRoot(document.getElementById('root')!).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path='/' >
          <Route index element={<RegisterPage />} />
          <Route element={<LoginPage />} path='/login' />
          <Route element={<ProtectedRoutes />}>
            <Route element={<TasksPage />} path='/home' />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
