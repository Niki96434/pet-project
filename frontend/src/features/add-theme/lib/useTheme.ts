import { useContext } from 'react';
import { ThemeContext } from '../../../app/providers/ThemeContext';
import type { Theme } from '../ui/ThemeToggler';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) return { theme: 'light', setTheme: (theme: Theme) => console.log(theme) }
    return context
}
