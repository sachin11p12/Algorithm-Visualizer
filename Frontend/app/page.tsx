'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Code2,
  Cpu,
  Rocket,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Database,
  Wrench,
  Brain,
  CheckCircle2,
  ExternalLink,
  FileText,
  Layers,
  ShieldCheck,
  Server,
  Film,
  Building2,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GitHubCalendarSection } from '@/components/portfolio/GitHubCalendarSection';

function TypewriterHeadline() {
  const words = [
    'scalable web apps & RESTful APIs.',
    'high-performance Spring Boot backends.',
    'interactive DSA visualizer engines.',
    'modern React & Next.js platforms.',
  ];

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [reverse, setReverse] = React.useState(false);

  React.useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2400);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 65);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-[1.15] min-h-[110px] sm:min-h-[140px]">
      Full-Stack Developer crafting{' '}
      <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {words[index].substring(0, subIndex)}
      </span>
      <span className="inline-block w-[3px] h-8 sm:h-12 ml-1 bg-primary animate-pulse align-middle" />
    </h1>
  );
}

export default function PortfolioHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Header view="home" />

      <main className="flex-1 max-w-[1280px] mx-auto px-6 lg:px-12 py-12 w-full space-y-20">

        {/* ── 1. HERO SECTION ── */}
        <section className="space-y-8 pt-4">
          <div className="space-y-6 max-w-4xl">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Associate Software Developer</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border/50 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Noida, Uttar Pradesh</span>
              </div>
            </div>

            {/* Main Headline with Typewriter Effect */}
            <TypewriterHeadline />

            {/* Summary */}
            <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
              Software Developer with 1 year of hands-on experience building end-to-end applications using{' '}
              <span className="text-foreground font-bold">Java, Spring Boot, React.js, Next.js, TypeScript</span>, and{' '}
              <span className="text-foreground font-bold">PostgreSQL</span>. Passionate about clean code, state management with Zustand, performance optimization, and interactive algorithm visualizers.
            </p>

            {/* CTAs & Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/algo"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center space-x-2 scale-100 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Algo Visualizer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-semibold text-sm transition-all"
              >
                View Projects
              </a>

              <Link
                href="/resume"
                target="_blank"
                className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-semibold text-sm transition-all flex items-center space-x-2"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>View Resume</span>
              </Link>

              <a
                href="mailto:sachin11p12@gmail.com"
                className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-semibold text-sm transition-all"
              >
                Contact Me
              </a>
            </div>

            {/* Quick Contact Info Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-muted-foreground">
              <a
                href="mailto:sachin11p12@gmail.com"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>sachin11p12@gmail.com</span>
              </a>
              <a
                href="tel:6386430534"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 6386430534</span>
              </a>
              <a
                href="https://github.com/sachin11p12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4 text-primary" />
                <span>github.com/sachin11p12</span>
              </a>
              <a
                href="https://linkedin.com/in/sachin-tiwari-18s21"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span>linkedin.com/in/sachin-tiwari-18s21</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. TECHNICAL SKILLS SECTION ── */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          <div className="space-y-2 border-b border-border/40 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Code2 className="w-4 h-4" />
              <span>Technical Expertise</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Skills & Technologies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Languages & Databases */}
            <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Languages & Databases</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Java', 'JavaScript (ES6+)', 'TypeScript', 'PostgreSQL', 'MySQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-semibold border border-border/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Web Technologies */}
            <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Web Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Spring Boot', 'React.js', 'Next.js', 'RESTful APIs', 'JPA / Hibernate', 'Tailwind CSS', 'Zustand'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-semibold border border-border/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Developer Tools */}
            <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Developer Tools</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['VS Code', 'IntelliJ IDEA', 'Antigravity', 'Postman', 'Git', 'GitHub'].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-semibold border border-border/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 4: Soft Skills */}
            <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Soft Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Problem Solving', 'Teamwork & Collaboration', 'Communication', 'Analytical Thinking'].map((soft) => (
                  <span
                    key={soft}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-semibold border border-border/40"
                  >
                    {soft}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. PROFESSIONAL EXPERIENCE SECTION ── */}
        <section id="experience" className="space-y-8 scroll-mt-20">
          <div className="space-y-2 border-b border-border/40 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Briefcase className="w-4 h-4" />
              <span>Career History</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Professional Experience</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 lg:p-8 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Full Stack Developer</h3>
                  <p className="text-sm font-semibold text-primary">masterstroke media digiinnovators pvt ltd</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 w-fit">
                  <span>07/2025 – Present</span>
                  <span>|</span>
                  <span>Noida, UP</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {[
                  'Developed responsive and reusable user interfaces using React.js, Next.js, TypeScript, and Tailwind CSS.',
                  'Designed and integrated RESTful APIs using Java Spring Boot to deliver end-to-end application features.',
                  'Built and maintained admin dashboards, content management modules, and OTT platform functionalities.',
                  'Implemented client-side state management using Zustand, optimizing overall application performance and user experience.',
                  'Collaborated actively with team members on feature development, code reviews, debugging, unit testing, and Git-based version control.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 4. FEATURED PROJECTS SECTION ── */}
        <section id="projects" className="space-y-8 scroll-mt-20">
          <div className="space-y-2 border-b border-border/40 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Rocket className="w-4 h-4" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Project 1: Algo Visualizer */}
            <div className="group flex flex-col justify-between p-6 rounded-2xl glass-card bg-card/60 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>Algo Visualizer</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-primary/15 text-primary">Interactive</span>
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground">Interactive DSA Visualization Studio</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Step-by-step 60 FPS animated visualization engine for Sorting & Searching algorithms. Features live pseudocode line execution highlight, dynamic array bar height scaling, and real-time comparison & swap metrics.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Next.js 15', 'React 19', 'TypeScript', 'Zustand', 'Framer Motion', 'Tailwind'].map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-border/40 flex items-center justify-between">
                <Link
                  href="/algo"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <span>Launch Visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://github.com/sachin11p12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Project 2: KikDrama Web Application */}
            <div className="group flex flex-col justify-between p-6 rounded-2xl glass-card bg-card/60 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  <Film className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>KikDrama Platform</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-500">03/2026 - Present</span>
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground">OTT Streaming & Content Platform</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Responsive OTT streaming platform featuring reusable UI components, Java Spring Boot RESTful APIs for authentication, content management, subscriptions, and database integration with PostgreSQL.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['React.js', 'Next.js', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Zustand'].map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Full-Stack OTT System</span>
                <a
                  href="https://github.com/sachin11p12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Project 3: Bank Management System */}
            <div className="group flex flex-col justify-between p-6 rounded-2xl glass-card bg-card/60 border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>Bank Management</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500">Backend System</span>
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground">Scalable Banking & Transaction Engine</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full banking system managing users, accounts, loans, and transaction workflows using Spring Boot MVC & PostgreSQL. Includes role-based access control (Admin/User), transaction audit history, and JPA/Hibernate optimization.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Java', 'Spring Boot', 'PostgreSQL', 'MVC', 'JPA/Hibernate', 'REST APIs'].map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-border/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Secure Banking Engine</span>
                <a
                  href="https://github.com/sachin11p12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ── GITHUB CONTRIBUTIONS SECTION ── */}
        <GitHubCalendarSection />

        {/* ── 5. EDUCATION & CERTIFICATIONS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Education Card */}
          <section className="space-y-6">
            <div className="space-y-2 border-b border-border/40 pb-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Foundation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">Education</h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">B.Tech in Information Technology</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">Grade: A</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground">Goel Institute of Technology and Management</p>
                <p className="text-xs text-muted-foreground">2022 – 2025 | Lucknow, Uttar Pradesh</p>
                <div className="pt-2">
                  <a
                    href="/Sachin_PDC.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Degree / PDC</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">Diploma in Mechanical Engineering</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">Grade: A</span>
                </div>
                <p className="text-xs font-semibold text-muted-foreground">Goel Institute of Technology and Management</p>
                <p className="text-xs text-muted-foreground">2019 – 2022 | Lucknow, Uttar Pradesh</p>
              </div>
            </div>
          </section>

          {/* Certifications & AI Training */}
          <section className="space-y-6">
            <div className="space-y-2 border-b border-border/40 pb-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Award className="w-4 h-4" />
                <span>Skill Accreditation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">Certifications & Training</h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-2">
                <h3 className="text-base font-bold text-foreground flex items-center justify-between">
                  <span>Java Web Development</span>
                  <span className="text-xs font-semibold text-primary">HCL Tech</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Practical experience in Java backend development with Spring Boot for enterprise applications, SQL database connectivity, and version control using Git and GitHub.
                </p>
                <div className="pt-2">
                  <a
                    href="/HCL_JWD_Certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-2">
                <h3 className="text-base font-bold text-foreground flex items-center justify-between">
                  <span>AI Agents & Agentic AI Certification</span>
                  <span className="text-xs font-semibold text-primary">Agentic Automation</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  AI Agent development covering LLMs, prompt engineering, ReAct & ReWOO frameworks, single/multi-agent architectures, memory, reasoning, tool calling, and n8n automation.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* ── 6. RESEARCH PUBLICATIONS SECTION ── */}
        <section className="space-y-6">
          <div className="space-y-2 border-b border-border/40 pb-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
              <BookOpen className="w-4 h-4" />
              <span>Academic Papers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Research Publications</h2>
          </div>

          <div className="p-6 lg:p-8 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-foreground">
                Secure and Scalable Banking Systems Architecture
              </h3>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-secondary text-muted-foreground border border-border/40 w-fit">
                Published: 05/2025
              </span>
            </div>
            <p className="text-xs font-semibold text-primary">
              International Journal for Research in Applied Science & Engineering Technology
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Published a research review paper focusing on digital banking architecture, security principles, user authentication, role-based access control (RBAC), transaction management workflows, and scalable system design principles.
            </p>
            <div className="pt-2">
              <a
                href="https://www.ijraset.com/print-certificate/review-paper-on-nextgen-banking-a-secure-and-scalable-banking-system"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <span>View Certificate / Publication</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── 7. CONTACT & GET IN TOUCH SECTION ── */}
        <section id="contact" className="space-y-8 scroll-mt-20">
          <div className="p-8 lg:p-12 rounded-3xl glass-card bg-gradient-to-br from-card via-card/80 to-primary/5 border border-primary/20 space-y-6 text-center max-w-3xl mx-auto shadow-xl">
            <div className="p-3 w-fit mx-auto rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Mail className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-foreground">Let&apos;s Build Something Great Together</h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
                I am open to full-stack software development opportunities, API engineering, and innovative web projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="mailto:sachin11p12@gmail.com"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>sachin11p12@gmail.com</span>
              </a>

              <a
                href="tel:6386430534"
                className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-semibold text-sm transition-all flex items-center space-x-2"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 6386430534</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
