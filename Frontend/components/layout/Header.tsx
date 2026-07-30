'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Cpu,
  Github,
  FileText,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  view?: 'home' | 'visualizer';
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Portfolio', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Algo Visualizer', href: '/sorting/bubble-sort', isFeatured: true },
    { label: 'Contact', href: 'mailto:Sachin11p12@gmail.com' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/40 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0">
          <div className="p-1.5 bg-primary/10 text-primary rounded-xl ring-1 ring-primary/20 shadow-sm group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            <span className="text-foreground">Algo</span>
            <span className="text-primary"> Visualizer</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : item.href.startsWith('/sorting') || item.href.startsWith('/searching')
                ? pathname !== '/'
                : pathname === item.href;

            if (item.isFeatured) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-md font-bold transition-all shadow-sm',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-primary/25'
                      : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20'
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors',
                  isActive
                    ? 'text-primary font-bold bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Theme Toggle, Resume, GitHub) */}
        <div className="hidden md:flex items-center space-x-2.5">
          {/* Resume Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-xs font-semibold text-foreground transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-primary" />
            <span>Resume</span>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/sachin11p12"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground transition-all shadow-sm"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-foreground transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-secondary border border-border/50 text-foreground"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-secondary border border-border/50 text-foreground"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 mt-3 pt-3 pb-4 px-4 space-y-2 bg-card/95 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors',
                item.isFeatured ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
              )}
            >
              {item.isFeatured && <Sparkles className="w-4 h-4" />}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="pt-2 flex items-center space-x-2">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-secondary border border-border/50 text-xs font-semibold text-foreground"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span>Resume</span>
            </a>

            <a
              href="https://github.com/sachin11p12"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-secondary border border-border/50 text-foreground"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
