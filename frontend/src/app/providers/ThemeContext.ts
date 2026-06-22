import { createContext } from 'react';
import type { Theme } from '../../features/add-theme/ui/ThemeToggler';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined); // пока не знаю какое дефолтное
