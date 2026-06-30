import { createRoot } from 'react-dom/client'
import { AppLayout } from './AppLayout';
import { Provider } from '../shared/lib/ui/provider';
import { BrowserRouter, Routes, Route } from 'react-router';
import { RegisterForm } from '../pages/login';
import { TasksPage } from '../pages/tasks-page';
import { LoginForm } from '../pages/login';
import { ProtectedRoutes } from './providers/ProtectedRoutes';
import './../shared/api/authInterceptor';

createRoot(document.getElementById('root')!).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />} path='/' >
          <Route element={<RegisterForm />} path='/register' />
          <Route element={<LoginForm />} path='/login' />
          <Route element={<ProtectedRoutes />}>
            <Route element={<TasksPage />} path='/home' />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)

