import { createRoot } from 'react-dom/client'
import AppLayout from './AppLayout';
import { Provider } from '../shared/lib/ui/provider';
import { BrowserRouter, Routes, Route } from 'react-router';
import TasksPage from "../pages/tasks-page";

createRoot(document.getElementById('root')!).render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
