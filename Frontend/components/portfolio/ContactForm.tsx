'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Create mailto fallback link with prefilled fields
    const mailtoSubject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    
    window.location.href = `mailto:sachin11p12@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="space-y-8 scroll-mt-20 pt-4">
      {/* Section Title Header */}
      <div className="space-y-2 border-b border-border/40 pb-4">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary">
          <Mail className="w-4 h-4" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Contact Me</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Have a project idea, job opportunity, or inquiry? Send a message below or reach out directly.
        </p>
      </div>

      {/* Main Grid: Info Bar (Left) + Interactive Contact Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column: Direct Info Cards (2 Cols) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="p-6 rounded-2xl glass-card bg-card/60 border border-border/50 space-y-6">
            <h3 className="text-lg font-bold text-foreground">Contact Details</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Direct Email */}
              <a
                href="mailto:sachin11p12@gmail.com"
                className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-secondary/40 border border-border/40 hover:border-primary/50 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase">Email Address</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    sachin11p12@gmail.com
                  </p>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href="tel:6386430534"
                className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-secondary/40 border border-border/40 hover:border-primary/50 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase">Phone Number</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    +91 6386430534
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-secondary/40 border border-border/40">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase">Location</p>
                  <p className="font-semibold text-foreground">Noida, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (3 Cols) */}
        <div className="lg:col-span-3">
          <div className="p-6 sm:p-8 rounded-2xl glass-card bg-card/70 border border-border/60 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Send A Message</h3>
              <div className="flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Reply</span>
              </div>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-foreground">Thank You!</h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Your message draft has been generated. If your mail client did not open automatically, send directly to{' '}
                  <strong className="text-foreground">sachin11p12@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-primary underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>Your Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <span>Your Message *</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, project idea, or opportunity details..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/60 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/60 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
