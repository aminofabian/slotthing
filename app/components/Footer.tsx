'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Bitcoin,
  CreditCard,
  Coins,
  Shield,
  Trophy,
  Zap,
  Star
} from 'lucide-react';

const socialLinks = [
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'Youtube' }
];

const paymentMethods = [
  { icon: <Bitcoin className="w-6 h-6" />, label: 'Bitcoin' },
  { icon: <CreditCard className="w-6 h-6" />, label: 'Credit Card' },
  { icon: <Coins className="w-6 h-6" />, label: 'Crypto' }
];

const footerLinks = [
  {
    title: 'Games',
    links: [
      { label: 'Slots', href: '#' },
      { label: 'Live Casino', href: '#' },
      { label: 'Jackpots', href: '#' },
      { label: 'New Releases', href: '#' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Responsible Gaming', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Contact', href: '#' }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-32 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-purple-900 to-black opacity-95" />

      {/* Floating Elements */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-float-slow opacity-20">
          <Star className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="absolute top-40 right-[15%] animate-float-delayed opacity-20">
          <Trophy className="w-10 h-10 text-yellow-400" />
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float opacity-20">
          <Shield className="w-12 h-12 text-yellow-400" />
        </div>
        <div className="absolute top-1/2 right-[25%] animate-float-slow opacity-20">
          <Zap className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Top Section with Logo and Social Links */}
        <div className="flex flex-col items-center mb-16 space-y-6">
          <div className="relative h-12 w-48">
            <Image
              src="/images/logo.png"
              alt="SlotThing Logo"
              fill
              className="object-contain"
            />
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="p-2 rounded-lg bg-purple-900/50 border border-yellow-400/10 hover:border-yellow-400/50 
                         text-yellow-400 transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Payment Methods Section */}
          <div>
            <h3 className="text-white font-bold mb-6">Payment Methods</h3>
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 rounded-xl bg-purple-900/50 border border-yellow-400/10
                           hover:border-yellow-400/30 transition-all duration-300"
                >
                  <div className="text-yellow-400 mb-2">{method.icon}</div>
                  <span className="text-xs text-gray-400">{method.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-yellow-400/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span>Licensed & Regulated</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <ThemeToggle />
              <div> {new Date().getFullYear()} SlotThing. All rights reserved.</div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Responsible Gaming</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
