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
    { label: 'Algo Visualizer', href: '/sorting/bubble-sort' },
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
  <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-16">
    <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.8fr_1fr] gap-14 lg:gap-24">
 
      {/* ── Column 1: Brand ── */}
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center">
          <span className="font-black text-3xl tracking-tight">
            <span className="text-foreground">Algo</span>
            <span className="text-primary">Visualizer</span>
          </span>
        </div>
 
        {/* Tagline */}
        <p className="text-md text-muted-foreground leading-relaxed max-w-[380px]">
          Master Algorithms Faster with Step-by-Step Visual Execution and Real-Time Insights.
        </p>
 
        {/* Meta info */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center space-x-2.5 text-sm text-muted-foreground">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
            <span>
              Made with <span className='text-sm'>♥</span> by{' '}
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
      <div className="space-y-7">
        <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
          Navigation
        </h4>
        <ul className="space-y-5">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-150 group"
              >
                {item.icon && <item.icon className="w-[18px] h-[18px] flex-shrink-0" />}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
 
      {/* ── Column 3: Legal + Connect stacked ── */}
      <div className="space-y-12">
        {/* Legal */}
        <div className="space-y-7">
          <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
            Legal
          </h4>
          <ul className="space-y-5">
            {legalLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[15px] text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Connect */}
        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">
            Connect
          </h4>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-secondary/60 border border-border/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
 
    </div>
  </div>
 
  {/* ── Bottom Bar ── */}
  <div className="border-t border-border/40">
    <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
      <span className="text-xs text-muted-foreground">
        © {year} AlgoVisualizer. All rights reserved.
      </span>
      <div className="flex items-center space-x-6 text-xs text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Sitemap</a>
        <a href="mailto:Sachin11p12@gmail.com" className="hover:text-foreground transition-colors">Contact</a>
      </div>
    </div>
  </div>
</footer>
  );
};
