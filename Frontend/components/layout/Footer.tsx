'use client';

import React from 'react';
import { Mail, Heart, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter / X' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/sachin11p12', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Visualizer', href: '#' },
    { label: 'About', href: '#' },
    { label: 'FAQs', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookies', href: '#' },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] dark:bg-[#060608] border-t border-white/10 mt-8">
      {/* Main footer body */}
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Column 1: Brand ── */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="font-black text-2xl tracking-tight">
                <span className="text-white">Algo</span>
                <span className="text-blue-500">Visualizer</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-[15px] text-gray-400 leading-relaxed">
              Interactive visualization tools for mastering sorting and searching algorithms.
            </p>

            {/* Meta info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5 text-[14px] text-gray-400">
                <Heart className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />
                <span>
                  Made with ♥ by{' '}
                  <span className="font-semibold text-blue-400">Sachin Tiwari</span>
                </span>
              </div>

              <div className="flex items-center space-x-2.5 text-[14px] text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:Sachin11p12@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Sachin11p12@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 2: Navigation ── */}
          <div className="space-y-5">
            <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-2 text-[15px] text-gray-400 hover:text-white transition-colors duration-150 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors" />
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
              <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">
                Legal
              </h4>
              <ul className="space-y-3.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[15px] text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] text-white">
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
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-200"
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
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[14px] text-gray-500">
            © {year} AlgoVisualizer. All rights reserved.
          </span>
          <div className="flex items-center space-x-5 text-[14px] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="mailto:Sachin11p12@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
