"use client";

import { useState } from "react";
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
  Briefcase,
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
    occupation: "",
    organization: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleField = (field: keyof typeof fields, value: string) => {
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
    if (!fields.occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
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
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1600));
      // For actual use, send `fields` with a POST fetch

      setSuccess(true);
      setFields({
        name: "",
        phone: "",
        email: "",
        occupation: "",
        organization: "",
        website: "",
        message: "",
      });
    } catch {
      setServerError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden md:flex h-full p-16  flex-col justify-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Contact Us
          </h1>
          <p className="text-xl leading-relaxed mb-8">
            Get in touch with the Dhaal AI team. We are here to help you with
            any questions, demos, partnership opportunities or support for our
            deepfake and image/video analysis solutions.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>info@dhaal.io</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              <span>+91 9250696982</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>dhaal.io</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="h-full flex flex-col justify-center p-8 md:p-16 bg-background ">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
            autoComplete="off"
          >
            {serverError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
                <AlertCircle className="h-5 w-5" />
                {serverError}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                <CheckCircle className="h-5 w-5" />
                Your message has been sent!
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={fields.name}
                  onChange={(e) => handleField("name", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              {errors.name && (
                <div className="text-xs text-red-600 mt-1">{errors.name}</div>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="pl-10"
                  value={fields.phone}
                  onChange={(e) => handleField("phone", e.target.value)}
                  disabled={isSubmitting}
                  type="tel"
                  inputMode="tel"
                />
              </div>
              {errors.phone && (
                <div className="text-xs text-red-600 mt-1">{errors.phone}</div>
              )}
            </div>

            {/* Work Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.name@company.com"
                  className="pl-10"
                  value={fields.email}
                  onChange={(e) => handleField("email", e.target.value)}
                  disabled={isSubmitting}
                  required
                  autoComplete="off"
                />
              </div>
              {errors.email && (
                <div className="text-xs text-red-600 mt-1">{errors.email}</div>
              )}
            </div>

            {/* Occupation */}
            <div className="space-y-1">
              <Label htmlFor="occupation">Occupation</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="occupation"
                  name="occupation"
                  placeholder="e.g., Security Analyst, Researcher"
                  className="pl-10"
                  value={fields.occupation}
                  onChange={(e) => handleField("occupation", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              {errors.occupation && (
                <div className="text-xs text-red-600 mt-1">
                  {errors.occupation}
                </div>
              )}
            </div>

            {/* Organisation Name */}
            <div className="space-y-1">
              <Label htmlFor="organization">Organisation Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Company or institution name"
                  className="pl-10"
                  value={fields.organization}
                  onChange={(e) => handleField("organization", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>
              {errors.organization && (
                <div className="text-xs text-red-600 mt-1">
                  {errors.organization}
                </div>
              )}
            </div>

            {/* Website */}
            <div className="space-y-1">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  name="website"
                  placeholder="https://yourcompany.com"
                  className="pl-10"
                  value={fields.website}
                  onChange={(e) => handleField("website", e.target.value)}
                  disabled={isSubmitting}
                  type="url"
                />
              </div>
              {errors.website && (
                <div className="text-xs text-red-600 mt-1">
                  {errors.website}
                </div>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <Label htmlFor="message">Anything else we should know?</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type anything you want to add for us (optional)"
                rows={6}
                value={fields.message}
                onChange={(e) => handleField("message", e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
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
      </section>
    </>
  );
}
