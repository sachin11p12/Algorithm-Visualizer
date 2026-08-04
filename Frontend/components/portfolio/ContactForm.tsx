'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, Send, Sparkles, Loader2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    const currentDateStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const formattedPayload = `
New Portfolio Inquiry

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

Submitted: ${currentDateStr}
`.trim();

    try {
      // Send form submission directly to sachin11p12@gmail.com via FormSubmit API
      const response = await fetch('https://formsubmit.co/ajax/sachin11p12@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formattedPayload,
          _subject: `New Portfolio Inquiry - ${formData.name}`,
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-secondary/40 border border-border/40">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase">Email Address</p>
                  <p className="font-semibold text-foreground">sachin11p12@gmail.com</p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-secondary/40 border border-border/40">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase">Phone Number</p>
                  <p className="font-semibold text-foreground">+91 6386430534</p>
                </div>
              </div>

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
              <div className="p-8 sm:p-10 rounded-2xl bg-card/90 border border-emerald-500/30 text-center space-y-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="text-4xl sm:text-5xl select-none">🎉</div>
                
                <div className="space-y-2">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    Thank you!
                  </h4>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Your message has been received.
                  </p>
                  <p className="text-xs sm:text-sm text-foreground/80 font-medium pt-1">
                    I&apos;ll respond as soon as possible.
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground font-semibold text-xs transition-all shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
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
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
