import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Sachin Tiwari | Full Stack Engineer',
  description:
    'A modern, responsive algorithm visualizer built with Next.js 15, React 19, TypeScript, Zustand, and Framer Motion by Sachin Tiwari.',
  keywords: [
    'Algorithm Visualizer',
    'Sorting Algorithms',
    'Searching Algorithms',
    'Next.js',
    'React',
    'TypeScript',
    'Data Structures',
    'Sachin Tiwari',
  ],
  authors: [{ name: 'Sachin Tiwari', url: 'https://github.com/sachin11p12' }],
  openGraph: {
    title: 'Sachin Tiwari | Full Stack Engineer',
    description:
      'Master Algorithms Faster with Step-by-Step Visual Execution and Real-Time Insights.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
