'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, Calendar, UserPlus } from 'lucide-react';

interface SignUpFormProps {
  onSubmit: (formData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    phone: string;
    address?: string;
    referralEmail?: string;
    games?: string[];
  }) => void;
}

const GAME_OPTIONS = [
  'Panda Master',
  'Juwa',
  'VB Link',
  'Ultra Panda',
  'Orion Stars',
  'Golden Dragon',
  'Egames',
  'Milky Way',
  'Golden Treasure'
];

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    referralEmail: '',
    games: [] as string[]
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({
    personal: 0,
    contact: 0,
    gaming: 0
  });

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: User,
      fields: ['username', 'firstName', 'lastName', 'password']
    },
    {
      id: 'contact',
      title: 'Contact Details',
      icon: Mail,
      fields: ['email', 'phone', 'address', 'dateOfBirth']
    },
    {
      id: 'gaming',
      title: 'Gaming Preferences',
      icon: UserPlus,
      fields: ['games', 'referralEmail']
    }
  ];

  const calculateSectionProgress = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return 0;
    
    const filledFields = section.fields.filter(field => {
      if (field === 'games') return formData.games.length > 0;
      return formData[field as keyof typeof formData]?.toString().trim() !== '';
    });
    
    return (filledFields.length / section.fields.length) * 100;
  };

  useEffect(() => {
    setSectionProgress({
      personal: calculateSectionProgress('personal'),
      contact: calculateSectionProgress('contact'),
      gaming: calculateSectionProgress('gaming')
    });
  }, [formData]);

  const totalProgress = Math.round(
    (sectionProgress.personal + sectionProgress.contact + sectionProgress.gaming) / 3
  );

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Required fields
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Referral email validation (if provided)
    if (formData.referralEmail && !emailRegex.test(formData.referralEmail)) {
      newErrors.referralEmail = 'Please enter a valid referral email';
    }

    // Phone validation
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Date of birth validation
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
      newErrors.dateOfBirth = 'You must be at least 18 years old';
    }

    // Terms and conditions
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { confirmPassword, ...submitData } = formData;
      await onSubmit(submitData);
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGameToggle = (game: string) => {
    setFormData(prev => ({
      ...prev,
      games: prev.games.includes(game)
        ? prev.games.filter(g => g !== game)
        : [...prev.games, game]
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Form Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] opacity-10" />
        <div className="relative p-8 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] bg-clip-text text-transparent">
              Create Your Account
            </h2>
            <p className="text-[#FFCF9D]/60">
              Join thousands of elite gamers worldwide
            </p>
            <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-[#FFCF9D]/60">
              {totalProgress}% Complete
            </p>
          </motion.div>
        </div>
      </div>

      {/* Multi-step form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const progress = sectionProgress[section.id as keyof typeof sectionProgress];
          
          return (
            <motion.div
              key={section.id}
              initial={false}
              animate={{ height: activeSection === index ? 'auto' : '64px' }}
              className="overflow-hidden bg-white/5 rounded-xl border border-white/10"
            >
              <button
                type="button"
                onClick={() => setActiveSection(activeSection === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#FFCF9D]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#FFCF9D]">{section.title}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#FFCF9D]/60">{Math.round(progress)}%</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: activeSection === index ? 180 : 0 }}
                  className="w-5 h-5 text-[#FFCF9D]/60"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </button>

              <div className={`px-6 pb-6 space-y-6 ${activeSection === index ? 'block' : 'hidden'}`}>
                {section.id === 'personal' && (
                  <>
                    {/* Personal Information Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Username*
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                            placeholder="Choose a username"
                          />
                          {errors.username && (
                            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium text-[#FFCF9D]/80">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Password*
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white pr-10"
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5 text-[#FFCF9D]/60" />
                            ) : (
                              <Eye className="w-5 h-5 text-[#FFCF9D]/60" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {section.id === 'contact' && (
                  <>
                    {/* Contact Details Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Phone*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                          placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Date of Birth*
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                        />
                        {errors.dateOfBirth && (
                          <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Address (Optional)
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                          placeholder="Enter your address"
                          rows={3}
                        />
                      </div>
                    </div>
                  </>
                )}

                {section.id === 'gaming' && (
                  <>
                    {/* Gaming Preferences Fields */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#FFCF9D]/80">
                          Favorite Games
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {GAME_OPTIONS.map(game => (
                            <button
                              key={game}
                              type="button"
                              onClick={() => handleGameToggle(game)}
                              className={`px-4 py-2 rounded-lg border ${
                                formData.games.includes(game)
                                  ? 'border-[#FFB000] bg-[#FFB000]/10 text-[#FFB000]'
                                  : 'border-white/10 bg-white/5 text-[#FFCF9D]/60 hover:border-[#FFB000]/50'
                              } transition-colors`}
                            >
                              {game}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="referralEmail" className="block text-sm font-medium text-[#FFCF9D]/80">
                          Referral Email (Optional)
                        </label>
                        <input
                          type="email"
                          id="referralEmail"
                          name="referralEmail"
                          value={formData.referralEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#FFB000] text-white"
                          placeholder="Enter referral email"
                        />
                        {errors.referralEmail && (
                          <p className="mt-1 text-sm text-red-500">{errors.referralEmail}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Terms and Submit */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#FFB000] focus:ring-[#FFB000]"
            />
            <label htmlFor="terms" className="text-sm text-[#FFCF9D]/60">
              I accept the terms and conditions
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500">{errors.terms}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || !termsAccepted}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              isLoading || !termsAccepted
                ? 'bg-white/10 text-white/60 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FFB000] to-[#FFCF9D] text-black hover:shadow-lg hover:shadow-[#FFB000]/20'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
