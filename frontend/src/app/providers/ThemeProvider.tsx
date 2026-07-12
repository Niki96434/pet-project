import React, { useMemo, useState } from "react"
import type { Theme } from '../../shared/api/context/ThemeContext';
import { ThemeContext } from "../../shared/api/context/ThemeContext";

interface ThemeProviderProps {
    children: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {

    const [theme, setTheme] = useState<Theme>(() => {
        const currentTheme = localStorage.getItem('theme');
        return (currentTheme as Theme) ?? 'light';
    });

    const contextValue = useMemo(() => ({
        theme,
        setTheme
    }), [theme]);

    return <ThemeContext value={contextValue} >{children}</ThemeContext>
}

export { ThemeProvider }