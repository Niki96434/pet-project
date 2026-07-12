import { QueryClientProvider } from '@tanstack/react-query';
import { AppContent } from './AppContent';
import { ThemeProvider } from './../core/theme/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';
import { queryClient } from '../shared/api/queryClient';

function AppLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export { AppLayout }
