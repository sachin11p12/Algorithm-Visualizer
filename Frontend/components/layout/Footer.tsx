'use client';

import React from 'react';
import { Cpu, Mail, Heart, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-card/50 backdrop-blur-sm mt-8">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">

          {/* Column 1: Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary/10 text-primary rounded-lg ring-1 ring-primary/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                <span className="text-foreground">Algo</span>
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Visualizer</span>
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">
              Interactive visualization tools for mastering sorting and searching algorithms.
            </p>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 flex-shrink-0" />
                <span>
                  Made with ♥ by{' '}
                  <span className="font-semibold text-primary">Sachin Tiwari</span>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:Sachin11p12@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  Sachin11p12@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#' },
                { label: 'Features', href: '#' },
                { label: 'Visualizer', href: '#' },
                { label: 'About', href: '#' },
                { label: 'FAQs', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal + Connect stacked */}
          <div className="space-y-8">
            {/* Legal */}
            <div className="space-y-5">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Legal</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Cookies', href: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Connect</h4>
              <div className="flex items-center space-x-2">
                {[
                  { icon: Twitter, href: '#', label: 'Twitter / X' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/sachin11p12', label: 'GitHub' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-200 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/40 px-6 lg:px-10 py-4 max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {year} AlgoVisualizer. All rights reserved.</span>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          <a href="mailto:Sachin11p12@gmail.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};


          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary/10 text-primary rounded-lg ring-1 ring-primary/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                <span className="text-foreground">Algo</span>
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Visualizer</span>
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              Interactive visualization tools for mastering sorting and searching algorithms.
            </p>

            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 flex-shrink-0" />
                <span>
                  Made with ♥ by{' '}
                  <span className="font-semibold text-primary">Sachin Tiwari</span>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:Sachin11p12@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  Sachin11p12@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#' },
                { label: 'Features', href: '#' },
                { label: 'Visualizer', href: '#' },
                { label: 'About', href: '#' },
                { label: 'FAQs', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookies', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Connect</h4>
            <div className="flex items-center space-x-2">
              {[
                { icon: Twitter, href: '#', label: 'Twitter / X' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/sachin11p12', label: 'GitHub' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-xl bg-secondary/80 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-200 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/40 px-6 lg:px-10 py-4 max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span>© {year} AlgoVisualizer. All rights reserved.</span>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          <a href="mailto:Sachin11p12@gmail.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
