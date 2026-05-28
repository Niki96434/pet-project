import { createRoot } from 'react-dom/client'
import AppLayout from './AppLayout';
import { Provider } from '../shared/lib/ui/provider';
import { BrowserRouter, Routes, Route } from 'react-router';
import { RegisterPage } from '../pages/login';
import { TasksPage } from '../pages/tasks-page';
import { LoginPage } from '../pages/login';

createRoot(document.getElementById('root')!).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/home' element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
