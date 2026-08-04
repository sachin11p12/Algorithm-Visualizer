'use client';

import React from 'react';
import {
  Mail,
  Heart,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Home,
  Sparkles,
  Info,
  HelpCircle,
} from 'lucide-react';

import { VisitorCounter } from '@/components/layout/VisitorCounter';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/sachintiwa90480', label: 'Twitter / X' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/sachin-tiwari-18s21/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/sachin11p12', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/sachin_tiwari_.12/', label: 'Instagram' },
  ];

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Algo Visualizer', href: '/algo', icon: Sparkles },
    { label: 'About', href: '#', icon: Info },
    { label: 'FAQs', href: '#', icon: HelpCircle },
  ];

  const learningItems = [
    { label: 'AI Agents' },
    { label: 'SpringBoot' },
    { label: 'System Design' },
  ];

  return (
    <footer className="w-full bg-card/60 backdrop-blur-md border-t border-border/40 mt-12 transition-colors duration-300">
      {/* Main footer body */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-20">

          {/* ── Column 1: Brand (Full width on mobile, 2-cols on tablet, 1-col on desktop) ── */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center">
              <span className="font-black text-2xl sm:text-3xl tracking-tight">
                <span className="text-foreground">Algo</span>
                <span className="text-primary">Visualizer</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Master Algorithms Faster with Step-by-Step Visual Execution and Real-Time Insights.
            </p>

            {/* Meta info */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
                <span>
                  Made with <span className="text-xs sm:text-sm">♥</span> by{' '}
                  <span className="font-semibold text-primary">Sachin Tiwari</span>
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:Sachin11p12@gmail.com"
                  className="hover:text-foreground transition-colors font-medium"
                >
                  Sachin11p12@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 2: Navigation ── */}
          <div className="space-y-5 sm:space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Navigation
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-sm sm:text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-150 group"
                  >
                    {item.icon && (
                      <item.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0 text-foreground dark:text-white group-hover:text-primary transition-colors duration-150" />
                    )}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Currently Learning + Connect stacked ── */}
          <div className="space-y-8 sm:space-y-10">
            {/* Currently Learning */}
            <div className="space-y-5 sm:space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Currently Learning
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {learningItems.map((item) => (
                  <li key={item.label}>
                    <span className="text-sm sm:text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-150 cursor-default">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4 sm:space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Connect
              </h4>
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 text-foreground dark:text-white hover:text-primary transition-colors duration-200 group"
                  >
                    <Icon className="w-5 h-5 text-foreground dark:text-white group-hover:text-primary transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-border/40">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="text-xs text-muted-foreground">
            © {year} AlgoVisualizer. All rights reserved.
          </span>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <VisitorCounter />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
