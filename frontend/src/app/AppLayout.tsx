import { QueryClientProvider } from '@tanstack/react-query';
import { AppContent } from './AppContent';
import { ThemeProvider } from './../core/theme/ThemeProvider';
import { queryClient } from '../shared/api/queryClient';

function AppLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export { AppLayout }
