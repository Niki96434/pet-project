import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import type { Theme } from '../../context/ThemeContext';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) return { theme: 'light', setTheme: (theme: Theme) => console.log(theme) }
    return context
}
