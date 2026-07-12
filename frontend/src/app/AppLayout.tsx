import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContent } from './AppContent';
import { ThemeProvider } from './../core/theme/ThemeProvider';
import { AuthProvider } from './providers/AuthProvider';

const queryClient = new QueryClient();

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
