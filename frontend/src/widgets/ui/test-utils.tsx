import { ThemeProvider } from './../../core/theme/ThemeProvider';
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

interface RenderProvidersProps {
    children: React.ReactNode;
}

const renderProviders = ({ children }: RenderProvidersProps) => {
    return <ThemeProvider>{children}</ThemeProvider>
}

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
    return render(ui, { wrapper: renderProviders, ...options })
}

export * from "@testing-library/react"
export { customRender as render }