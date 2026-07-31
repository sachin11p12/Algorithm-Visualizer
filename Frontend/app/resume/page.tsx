'use client';

import React from 'react';
import Link from 'next/link';
import { Printer, ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, Sparkles, Download } from 'lucide-react';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col items-center">
      {/* Floating Action Bar (hidden during printing) */}
      <div className="print:hidden sticky top-4 z-50 flex items-center justify-between gap-4 max-w-4xl w-full px-6 py-3.5 bg-slate-800/90 backdrop-blur-md border border-slate-700/60 rounded-2xl shadow-2xl mb-8">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* ── ATS-FRIENDLY PRINTABLE RESUME DOCUMENT ── */}
      <div className="max-w-4xl w-full bg-white text-slate-900 shadow-2xl rounded-xl p-8 sm:p-14 print:p-0 print:shadow-none print:bg-white print:text-black space-y-8 font-sans leading-normal">

        {/* HEADER / CONTACT INFO */}
        <div className="border-b-2 border-slate-900 pb-6 space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Sachin Tiwari</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 font-medium">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> sachin11p12@gmail.com</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> 6386430534</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Noida, Uttar Pradesh</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-700 font-semibold pt-1">
            <a href="https://github.com/sachin11p12" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
              <Github className="w-3.5 h-3.5" /> github.com/sachin11p12
            </a>
            <span>•</span>
            <a href="https://linkedin.com/in/sachin-tiwari-18s21" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
              <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/sachin-tiwari-18s21
            </a>
          </div>
        </div>

        {/* PROFESSIONAL SUMMARY */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed font-normal">
            Associate Software Developer with 1 year of experience in full-stack development using Java, Spring Boot, React.js, Next.js, and PostgreSQL. Skilled in building scalable applications, RESTful APIs, responsive UIs, cross-browser compatible solutions, authentication systems, and database-driven applications. Experienced in debugging, performance optimization, and maintaining reliable web applications.
          </p>
        </div>

        {/* TECHNICAL SKILLS */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-900">Languages & Databases: </span>
              <span className="text-slate-800">Java, JavaScript (ES6+), TypeScript, PostgreSQL, MySQL</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Web Technologies: </span>
              <span className="text-slate-800">Spring Boot, React.js, Next.js, RESTful APIs, JPA/Hibernate</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Developer Tools: </span>
              <span className="text-slate-800">VS Code, IntelliJ IDEA, Antigravity, Postman, Git, GitHub</span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Soft Skills: </span>
              <span className="text-slate-800">Problem Solving, Teamwork, Communication, Analytical Thinking</span>
            </div>
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-900">Full Stack Developer</span>
              <span className="text-[11px] font-semibold text-slate-700">07/2025 – Present | Noida</span>
            </div>
            <p className="text-xs font-semibold text-slate-800 italic">masterstroke media digiinnovators pvt ltd</p>
            <ul className="list-disc list-inside text-xs text-slate-800 space-y-1.5 pl-1">
              <li>Developed responsive and reusable user interfaces using React.js, Next.js, TypeScript, and Tailwind CSS.</li>
              <li>Designed and integrated RESTful APIs using Java Spring Boot to deliver end-to-end application features.</li>
              <li>Built and maintained admin dashboards, content management modules, and OTT platform functionalities.</li>
              <li>Implemented state management using Zustand and improved application performance and user experience.</li>
              <li>Collaborated with team members on feature development, code reviews, debugging, testing, and Git version control.</li>
            </ul>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Projects
          </h2>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-900">KikDrama Web Application</span>
              <span className="text-[11px] font-semibold text-slate-700">03/2026 – Present</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-800 space-y-1 pl-1">
              <li>Developed responsive OTT streaming interfaces and reusable UI components using React.js, Next.js, TypeScript, and Tailwind CSS.</li>
              <li>Designed, developed, and integrated RESTful APIs using Java Spring Boot for authentication, content management, subscriptions, and user modules.</li>
              <li>Worked on backend services, database operations, and API integration using Spring Boot, JPA/Hibernate, and PostgreSQL.</li>
              <li>Implemented client-side state management using Zustand and optimized application performance and user experience.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-900">Bank Management System</span>
              <span className="text-[11px] font-semibold text-slate-700">Backend Engineering</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-800 space-y-1 pl-1">
              <li>Developed a banking application using Java Spring Boot and PostgreSQL for managing users, accounts, loans, and transactions.</li>
              <li>Designed RESTful APIs following MVC architecture to build scalable and maintainable backend services.</li>
              <li>Implemented authentication, role-based access control (Admin/User), and transaction history features to enhance application security.</li>
              <li>Integrated JPA/Hibernate for efficient database operations and optimized backend performance.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-900">Algo Visualizer</span>
              <span className="text-[11px] font-semibold text-slate-700">Interactive Visual Studio</span>
            </div>
            <ul className="list-disc list-inside text-xs text-slate-800 space-y-1 pl-1">
              <li>Built a modern algorithm visualizer using Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand, and Framer Motion.</li>
              <li>Engineered 60 FPS animated array bar execution with line-by-line syntax-highlighted pseudocode playback.</li>
            </ul>
          </div>
        </div>

        {/* EDUCATION */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Education
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="font-bold text-slate-900">BTech in Information Technology</span> (Grade: A)
                <div className="text-slate-700">Goel Institute of Technology and Management</div>
              </div>
              <div className="text-[11px] font-semibold text-slate-700">2022 – 2025 | Lucknow, UP</div>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="font-bold text-slate-900">Diploma in Mechanical Engineering</span> (Grade: A)
                <div className="text-slate-700">Goel Institute of Technology and Management</div>
              </div>
              <div className="text-[11px] font-semibold text-slate-700">2019 – 2022 | Lucknow, UP</div>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS & TRAINING */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Certifications & Training
          </h2>
          <div className="space-y-2 text-xs text-slate-800">
            <div>
              <span className="font-bold text-slate-900">Java Web Development – HCL Tech: </span>
              <span>Practical experience in Java backend development with Spring Boot for enterprise apps, SQL, and Git.</span>
              <a
                href="/HCL_JWD_Certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-700 hover:underline font-semibold text-[11px]"
              >
                [View Certificate]
              </a>
            </div>
            <div>
              <span className="font-bold text-slate-900">AI Agents & Agentic AI: </span>
              <span>Covered LLMs, prompt engineering, ReAct/ReWOO frameworks, single/multi-agent architectures, memory, reasoning, tool calling, and n8n automation.</span>
            </div>
          </div>
        </div>

        {/* RESEARCH PUBLICATIONS */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
            Research Publications
          </h2>
          <div className="text-xs text-slate-800 space-y-1">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Secure and Scalable Banking Systems Architecture</span>
              <span className="text-[11px] text-slate-700 font-semibold">05/2025</span>
            </div>
            <div className="italic text-slate-700">International Journal for Research in Applied Science & Engineering Technology</div>
            <p className="mt-1 text-slate-800">
              Published research review paper on digital banking architecture, security principles, user authentication, role-based access control (RBAC), and transaction management principles.
            </p>
            <div className="pt-1">
              <a
                href="https://www.ijraset.com/print-certificate/review-paper-on-nextgen-banking-a-secure-and-scalable-banking-system"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-semibold text-[11px] inline-flex items-center gap-1"
              >
                <span>View Certificate: ijraset.com/print-certificate/review-paper-on-nextgen-banking</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
