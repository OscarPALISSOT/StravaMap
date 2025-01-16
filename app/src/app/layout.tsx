import type {Metadata} from "next";
import "@/styles/globals.css";
import "@/styles/variable.css";
import {Inter} from 'next/font/google';
import {ReactNode} from "react";
import SessionWrapper from "@/components/sessionWrapper";
import ThemeProviderWrap from "@/components/themeProvider";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--inter',
})

export const metadata: Metadata = {
    title: 'Strava Map',
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <SessionWrapper>
            <html lang="en" suppressHydrationWarning={true}>
            <body className={`${inter.variable} text-text dark:text-background`}>
            <main className={'bg-background dark:bg-text'}>
                <ThemeProviderWrap>
                    {children}
                </ThemeProviderWrap>
            </main>
            </body>
            </html>
        </SessionWrapper>
    );
}
