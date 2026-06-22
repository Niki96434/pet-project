import React, { useState } from "react"
import type { Theme } from '../../features/add-theme/ui/ThemeToggler';
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

    const [theme, setTheme] = useState<Theme>('light');

    return <ThemeContext.Provider value={{ theme, setTheme }} >{children}</ThemeContext.Provider>
}