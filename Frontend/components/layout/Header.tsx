'use client';

import React, { useState, useEffect } from 'react';
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
import { VisitorCounter } from '@/components/layout/VisitorCounter';

interface HeaderProps {
  view?: 'home' | 'visualizer';
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: 'Portfolio', href: '/' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Algo Visualizer', href: '/algo', isFeatured: true },
    { label: 'Contact', href: '#contact' },
  ];

  // Smooth scroll handler preventing #hash from appearing in URL bar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-border/40 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group flex-shrink-0">
          <div className="p-1.5 bg-primary/10 text-primary rounded-xl ring-1 ring-primary/20 shadow-sm group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-foreground">SACHIN</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith('/algo') || pathname.startsWith('/sorting') || pathname.startsWith('/searching');

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
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer',
                  isActive
                    ? 'text-primary font-bold bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Actions (VisitorCounter, Theme Toggle, Download Resume, GitHub) */}
        <div className="hidden md:flex items-center space-x-2.5">
          <VisitorCounter />
          {/* Download Resume Button */}
          <Link
            href="/resume"
            target="_blank"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs transition-all shadow-sm hover:bg-primary/90 active:scale-95"
            title="View & Print Resume PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>

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
            onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/40 text-foreground transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            title="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-secondary border border-border/50 text-foreground"
          >
            {mounted && theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
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
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, item.href);
              }}
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer',
                item.isFeatured ? 'bg-primary/10 text-primary border border-primary/20' : 'text-foreground hover:bg-secondary'
              )}
            >
              {item.isFeatured && <Sparkles className="w-4 h-4" />}
              <span>{item.label}</span>
            </a>
          ))}

          <div className="pt-2 flex items-center space-x-2">
            <Link
              href="/resume"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>Resume PDF</span>
            </Link>

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
