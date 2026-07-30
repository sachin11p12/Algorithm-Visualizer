'use client';

import React from 'react';
import { Mail, Heart, Twitter, Linkedin, Github, Instagram, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter / X' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/sachin11p12', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Visualizer', href: '/sorting/bubble-sort' },
    { label: 'About', href: '#' },
    { label: 'FAQs', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookies', href: '#' },
  ];

  return (
    <footer className="w-full bg-card/60 backdrop-blur-md border-t border-border/40 mt-12 transition-colors duration-300">
      {/* Main footer body */}
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Column 1: Brand ── */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary/10 text-primary rounded-lg ring-1 ring-primary/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tight">
                <span className="text-foreground">Algo</span>
                <span className="text-primary">Visualizer</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Master Algorithms Faster with Step-by-Step Visual Execution and Real-Time Insights.
            </p>

            {/* Meta info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
                <span>
                  Made with ♥ by{' '}
                  <span className="font-semibold text-primary">Sachin Tiwari</span>
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-sm text-muted-foreground">
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
          <div className="space-y-5">
            <h4 className="text-md font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 group-hover:bg-primary transition-colors" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Legal + Connect stacked ── */}
          <div className="space-y-10">
            {/* Legal */}
            <div className="space-y-5">
              <h4 className="text-md font-bold uppercase tracking-wider text-foreground">
                Legal
              </h4>
              <ul className="space-y-3.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h4 className="text-md font-bold uppercase tracking-wider text-foreground">
                Connect
              </h4>
              <div className="flex items-center space-x-2.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-border/40">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            © {year} AlgoVisualizer. All rights reserved.
          </span>
          <div className="flex items-center space-x-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Sitemap</a>
            <a href="mailto:Sachin11p12@gmail.com" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
