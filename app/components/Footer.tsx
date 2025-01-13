'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Shield, Bitcoin, CreditCard, Sparkles, ArrowRight, Globe, Clock } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      return () => footer.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'Youtube' },
  ];

  const paymentMethods = [
    { icon: <Bitcoin className="w-6 h-6" />, label: 'Bitcoin' },
    { icon: <CreditCard className="w-6 h-6" />, label: 'Credit Card' },
  ];

  const features = [
    { icon: <Shield className="w-6 h-6" />, label: 'Secure Gaming' },
    { icon: <Clock className="w-6 h-6" />, label: '24/7 Support' },
    { icon: <Globe className="w-6 h-6" />, label: 'Global Access' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative pt-32 pb-8 overflow-hidden bg-[#0E0E0E]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/50 via-[#0E0E0E]/50 to-[#1A1A1A]/50" />
        
        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFB000]"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -500],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onHoverStart={() => setHoveredSection('about')}
            onHoverEnd={() => setHoveredSection(null)}
            className="relative"
          >
            <div className="mb-6">
              <Image 
                src="/4.png" 
                alt="Logo" 
                width={150} 
                height={40}
                className="mb-4"
              />
              <p className="text-[#FFCF9D]/70">
                Experience the thrill of next-generation gaming with our innovative platform.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center text-[#FFB000] hover:from-[#FFB000] hover:to-[#FFCF9D] hover:text-black transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onHoverStart={() => setHoveredSection('links')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Games', 'Promotions', 'VIP Club', 'Affiliates'].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 text-[#FFB000] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <a href="#" className="text-[#FFCF9D]/70 hover:text-[#FFCF9D] transition-colors ml-2">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onHoverStart={() => setHoveredSection('contact')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[#FFB000]" />
                </div>
                <span className="text-[#FFCF9D]/70">support@slotthing.com</span>
              </motion.li>
              <motion.li 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#FFB000]" />
                </div>
                <span className="text-[#FFCF9D]/70">24/7 Support Available</span>
              </motion.li>
              <motion.li 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#FFB000]" />
                </div>
                <span className="text-[#FFCF9D]/70">Global Gaming Hub</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onHoverStart={() => setHoveredSection('features')}
            onHoverEnd={() => setHoveredSection(null)}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent mb-6">
              Why Choose Us
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FFB000]/20 to-[#FFCF9D]/20 flex items-center justify-center group-hover:from-[#FFB000] group-hover:to-[#FFCF9D] transition-all">
                    {feature.icon}
                  </div>
                  <span className="text-[#FFCF9D]/70 group-hover:text-[#FFCF9D]">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#1A1A1A]/50 border border-[#FFB000]/20"
            >
              {method.icon}
              <span className="text-[#FFCF9D]">{method.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="relative border-t border-[#FFB000]/20 pt-8">
          {/* Interactive Spotlight Effect */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 176, 0, 0.15), transparent 25%)`
            }}
          />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#FFCF9D]/70 text-sm"
            >
              &copy; 2025 SlotThing. All rights reserved.
            </motion.p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Responsible Gaming'].map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="text-[#FFCF9D]/70 hover:text-[#FFCF9D] text-sm transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 right-0"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#FFB000]/5 to-[#FFCF9D]/5 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-[#FFB000]/20" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
