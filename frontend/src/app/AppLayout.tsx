import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContent } from './AppContent';
import { ThemeProvider } from './providers/ThemeProvider';

const queryClient = new QueryClient();

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
