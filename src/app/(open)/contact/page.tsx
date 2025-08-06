"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  User,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Globe,
  Building2,
  PhoneCall,
} from "lucide-react";
import Header from "@/components/global/header";

// Email regex for vanity (work email, not gmail/yahoo/outlook, etc)
const workEmailRegex =
  /^[A-Za-z0-9._%+-]+@((?!gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|icloud\.com|protonmail\.com)[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/i;

export default function ContactPage() {
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleField = (field: keyof typeof fields, value: string) => {
    setServerError("");
    setSuccess(false);
    setFields((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function validate() {
    const newErrors: typeof errors = {};

    if (!fields.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (fields.phone && !/^[0-9+\-\s()]{7,}$/.test(fields.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!fields.email.trim()) {
      newErrors.email = "Work email is required.";
    } else if (!workEmailRegex.test(fields.email.trim())) {
      newErrors.email =
        "Please enter a valid work email (not a public domain).";
    }
    if (!fields.organization.trim()) {
      newErrors.organization = "Organization name is required.";
    }
    if (fields.website && !/^https?:\/\/.+\..+/.test(fields.website.trim())) {
      newErrors.website =
        "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);
  
    if (!validate()) return;
  
    setIsSubmitting(true);
    try {
      // Create FormData instead of JSON
      const formData = new FormData();
      formData.append('name', fields.name);
      formData.append('phone', fields.phone);
      formData.append('email', fields.email);
      formData.append('organization', fields.organization);
      formData.append('website', fields.website);
      formData.append('message', fields.message);
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_APP_SCRIPT_URL}`, {
        method: 'POST',
        body: formData // No Content-Type header needed - browser sets it automatically
      });
  
      
        setSuccess(true);
        setFields({
          name: "",
          phone: "",
          email: "",
          organization: "",
          website: "",
          message: "",
        });
    } catch (error) {
      console.error('Submission error:', error);
      setSuccess(true);
      setFields({
        name: "",
        phone: "",
        email: "",
        organization: "",
        website: "",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reduced animation variants for subtle background
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      x: [-2, 2, -2],
      rotate: [0, 360],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 40,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <>
      <Header />
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-zinc-950">
        {/* Left Section - Always Dark */}
        <div className="hidden md:flex h-full p-16 flex-col justify-center bg-zinc-900 text-white relative overflow-hidden">
          {/* Subtly Animated Background SVG */}
          <div className="absolute inset-0 overflow-hidden opacity-60">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Floating Circles */}
              <motion.circle
                cx="150"
                cy="100"
                r="40"
                fill="url(#gradient1)"
                variants={floatingVariants}
                animate="animate"
              />
              
              <motion.circle
                cx="600"
                cy="200"
                r="25"
                fill="url(#gradient2)"
                variants={pulseVariants}
                animate="animate"
              />

              <motion.circle
                cx="700"
                cy="450"
                r="50"
                fill="url(#gradient3)"
                variants={floatingVariants}
                animate="animate"
              />

              {/* Orbiting Elements */}
              <motion.g
                variants={orbitVariants}
                animate="animate"
                style={{ transformOrigin: "400px 300px" }}
              >
                <circle cx="300" cy="300" r="4" fill="#60A5FA" opacity="0.4" />
                <circle cx="500" cy="300" r="3" fill="#A78BFA" opacity="0.3" />
                <circle cx="400" cy="200" r="2" fill="#34D399" opacity="0.3" />
              </motion.g>

              {/* Morphing Shapes */}
              <motion.path
                d="M100,300 Q200,200 300,300 T500,300"
                stroke="url(#gradient4)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 1 }}
              />

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#34D399" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-gray-300">
              Get in touch with the Dhaal AI team. We are here to help you with
              any questions, demos, partnership opportunities or support for our
              deepfake and image/video analysis solutions.
            </p>
          </div>
        </div>

        {/* Right Section - Responsive Colors */}
        <div className="h-full flex flex-col justify-center p-8 md:p-16 bg-background">
          <div className="w-full max-w-lg mx-auto">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
              autoComplete="off"
            >
              {serverError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  {serverError}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300">
                  <CheckCircle className="h-5 w-5" />
                  Your message has been sent!
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className="pl-10 h-10"
                    value={fields.name}
                    onChange={(e) => handleField("name", e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                {errors.name && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.name}</div>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="pl-10 h-10"
                    value={fields.phone}
                    onChange={(e) => handleField("phone", e.target.value)}
                    disabled={isSubmitting}
                    type="tel"
                    inputMode="tel"
                  />
                </div>
                {errors.phone && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.phone}</div>
                )}
              </div>

              {/* Work Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.name@company.com"
                    className="pl-10 h-10"
                    value={fields.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    disabled={isSubmitting}
                    required
                    autoComplete="off"
                  />
                </div>
                {errors.email && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</div>
                )}
              </div>

              {/* Organisation Name */}
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-medium">Organisation Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Company or institution name"
                    className="pl-10 h-10"
                    value={fields.organization}
                    onChange={(e) => handleField("organization", e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                {errors.organization && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.organization}
                  </div>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    name="website"
                    placeholder="https://yourcompany.com"
                    className="pl-10 h-10"
                    value={fields.website}
                    onChange={(e) => handleField("website", e.target.value)}
                    disabled={isSubmitting}
                    type="url"
                  />
                </div>
                {errors.website && (
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                    {errors.website}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Anything else we should know?</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type anything you want to add for us (optional)"
                  rows={4}
                  value={fields.message}
                  onChange={(e) => handleField("message", e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
