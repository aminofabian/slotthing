'use client';
import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <User className="w-5 h-5 text-yellow-400" />
        </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
          className="w-full pl-12 pr-4 py-3 bg-purple-900/30 border border-yellow-400/10 rounded-xl 
                   focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/10
                   placeholder:text-gray-500 text-white backdrop-blur-sm transition-all duration-300"
        />
      </div>

      {/* Email Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Mail className="w-5 h-5 text-yellow-400" />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
          className="w-full pl-12 pr-4 py-3 bg-purple-900/30 border border-yellow-400/10 rounded-xl 
                   focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/10
                   placeholder:text-gray-500 text-white backdrop-blur-sm transition-all duration-300"
        />
      </div>

      {/* Message Input */}
      <div className="relative">
        <div className="absolute left-3 top-4">
          <MessageSquare className="w-5 h-5 text-yellow-400" />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your Message"
          rows={4}
          className="w-full pl-12 pr-4 py-3 bg-purple-900/30 border border-yellow-400/10 rounded-xl 
                   focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/10
                   placeholder:text-gray-500 text-white backdrop-blur-sm transition-all duration-300"
        />
      </div>

      {/* Submit Button */}
      <div className="relative">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 
                   text-black font-semibold rounded-xl hover:brightness-110 transition-all duration-300 
                   shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed
                   group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 
                        rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </span>
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="text-green-400 text-center animate-fadeIn">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="text-red-400 text-center animate-fadeIn">
          Oops! Something went wrong. Please try again.
        </div>
      )}
    </form>
  );
}
