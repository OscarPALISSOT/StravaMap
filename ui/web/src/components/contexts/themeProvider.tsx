'use client';

import {ReactNode} from "react";
import {ThemeProvider} from "next-themes";

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeProviderWrap = ({children}: ThemeProviderProps) => {
    return (
        <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem={true}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderWrap;