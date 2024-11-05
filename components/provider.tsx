'use client';
import { ThemeProvider as ThemeProviderPrimitive } from 'next-themes';

export default function ThemeProvider({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<
  typeof ThemeProviderPrimitive
>) {
  return (
    <ThemeProviderPrimitive attribute="class" defaultTheme="system" {...props}>
      {children}
    </ThemeProviderPrimitive>
  );
}
