"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

    // Helper component to dynamically update the theme-color meta tag
        function ThemeUpdater() {
            const { resolvedTheme } = useTheme();

                useEffect(() => {
                    const metaThemeColor = document.getElementById("theme-color-meta");
                    if (metaThemeColor) {
                        const color = resolvedTheme === "light" ? "#FFFFFF" : "#252525";
                        metaThemeColor.setAttribute("content", color);
                      }
                  }, [resolvedTheme]);

                return null; // This component doesn't render anything visible
          }

export function ThemeProvider({
                                children,
                                ...props
                              }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
          <NextThemesProvider {...props}>
              <ThemeUpdater />
              {children}
            </NextThemesProvider>
        );
}
