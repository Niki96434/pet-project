import { createRoot } from 'react-dom/client'
import App from './App';
import { Provider } from '../shared/lib/ui/provider';
createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
)
