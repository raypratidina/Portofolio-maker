'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
                <MotionConfig reducedMotion="user">{children}</MotionConfig>
            </ThemeProvider>
        </SessionProvider>
    );
}
