"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
  Users,
  Heart,
  Handshake,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getTranslation } from "@/i18n";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const involvementKeys = ["donate"] as const;
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  volunteer: Heart,
  partner: Handshake,
  donate: DollarSign,
};
const colorMap: Record<string, string> = {
  volunteer: "red",
  partner: "green",
  donate: "red",
};

export default function GetInvolvedPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = getTranslation(language);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [memberType, setMemberType] = useState<"STUDENT" | "PROFESSIONAL">("STUDENT");
  const [district, setDistrict] = useState("");
  const [interests, setInterests] = useState("");
  const [motivation, setMotivation] = useState("");
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Volunteer form state
  const [volFullName, setVolFullName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPhone, setVolPhone] = useState("");
  const [volInstitution, setVolInstitution] = useState("");
  const [volSkills, setVolSkills] = useState("");
  const [volInterests, setVolInterests] = useState("");
  const [volExperience, setVolExperience] = useState("");
  const [volAvailability, setVolAvailability] = useState("");
  const [volMotivation, setVolMotivation] = useState("");
  const [volPortfolioUrl, setVolPortfolioUrl] = useState("");
  const [volConsent, setVolConsent] = useState(false);
  const [volSubmitting, setVolSubmitting] = useState(false);
  const [volSubmitted, setVolSubmitted] = useState(false);
  const [volError, setVolError] = useState("");

  // Partnership form state
  const [orgName, setOrgName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [orgType, setOrgType] = useState("");
  const [website, setWebsite] = useState("");
  const [partnershipInterest, setPartnershipInterest] = useState("");
  const [partnerMessage, setPartnerMessage] = useState("");
  const [partnerConsent, setPartnerConsent] = useState(false);
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerError, setPartnerError] = useState("");

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setInstitution("");
    setDepartment("");
    setMemberType("STUDENT");
    setDistrict("");
    setInterests("");
    setMotivation("");
    setConsent(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !institution.trim() || !motivation.trim() || !consent) {
      setError(t.membershipForm.required);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/membership`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          institution,
          department: department || undefined,
          memberType,
          district: district || undefined,
          interests: interests || undefined,
          motivation,
          consent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to submit application");
      }

      setSubmitted(true);
      resetForm();
    } catch (err) {
      setError(t.membershipForm.error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetVolForm = () => {
    setVolFullName("");
    setVolEmail("");
    setVolPhone("");
    setVolInstitution("");
    setVolSkills("");
    setVolInterests("");
    setVolExperience("");
    setVolAvailability("");
    setVolMotivation("");
    setVolPortfolioUrl("");
    setVolConsent(false);
  };

  const handleVolSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setVolError("");

    if (!volFullName.trim() || !volEmail.trim() || !volPhone.trim() || !volMotivation.trim() || !volConsent) {
      setVolError(t.volunteerForm.required);
      return;
    }

    setVolSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/volunteer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: volFullName,
          email: volEmail,
          phone: volPhone,
          institution: volInstitution || undefined,
          skills: volSkills || undefined,
          interests: volInterests || undefined,
          experience: volExperience || undefined,
          availability: volAvailability || undefined,
          motivation: volMotivation,
          portfolioUrl: volPortfolioUrl || undefined,
          consent: volConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to submit application");
      }

      setVolSubmitted(true);
      resetVolForm();
    } catch {
      setVolError(t.volunteerForm.error);
    } finally {
      setVolSubmitting(false);
    }
  };

  const resetPartnerForm = () => {
    setOrgName("");
    setContactPerson("");
    setPartnerEmail("");
    setPartnerPhone("");
    setOrgType("");
    setWebsite("");
    setPartnershipInterest("");
    setPartnerMessage("");
    setPartnerConsent(false);
  };

  const handlePartnerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPartnerError("");

    if (!orgName.trim() || !contactPerson.trim() || !partnerEmail.trim() || !partnershipInterest.trim() || !partnerMessage.trim() || !partnerConsent) {
      setPartnerError(t.partnershipForm.required);
      return;
    }

    setPartnerSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/partnership`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: orgName,
          contactPerson,
          email: partnerEmail,
          phone: partnerPhone || undefined,
          organizationType: orgType || undefined,
          website: website || undefined,
          partnershipInterest,
          message: partnerMessage,
          consent: partnerConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to submit inquiry");
      }

      setPartnerSubmitted(true);
      resetPartnerForm();
    } catch {
      setPartnerError(t.partnershipForm.error);
    } finally {
      setPartnerSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className={`${theme === "dark" ? "bg-dark-secondary" : "bg-cy-light"} pt-32 pb-16 lg:pt-40 lg:pb-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className={`font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
              {t.getInvolved.title}
            </h1>
            <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
              {t.getInvolved.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className={`py-20 lg:py-28 ${theme === "dark" ? "bg-dark-bg" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative rounded-2xl overflow-hidden mb-12 border ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}>
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/community-outreach.png.png"
                alt="Young volunteers participating in community outreach"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cy-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t.getInvolved.makeDifference}
                </h2>
                <p className="text-white/80 text-sm max-w-xl">
                  {t.getInvolved.makeDifferenceText}
                </p>
              </div>
            </div>
          </div>

          {/* Become a Member - Form */}
          <div
            id="member"
            className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 mb-8 ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center bg-cy-green-50`}>
                <Users className="w-7 h-7 text-cy-green" />
              </div>
              <div className="flex-1">
                <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-3 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  {t.getInvolved.becomeMember.title}
                </h2>
                <p className={`leading-relaxed mb-6 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                  {t.getInvolved.becomeMember.description}
                </p>

                {submitted ? (
                  <div className="flex items-center gap-3 p-6 bg-cy-green-50 dark:bg-cy-green-50/10 rounded-2xl border border-cy-green/20">
                    <CheckCircle className="w-6 h-6 text-cy-green flex-shrink-0" />
                    <p className="text-cy-green-dark dark:text-cy-green font-medium">
                      {t.membershipForm.success}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="member-fullName" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.fullName} *
                        </label>
                        <input
                          id="member-fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={t.membershipForm.fullNamePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="member-email" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.email} *
                        </label>
                        <input
                          id="member-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.membershipForm.emailPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="member-phone" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.phone} *
                        </label>
                        <input
                          id="member-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.membershipForm.phonePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Institution */}
                      <div>
                        <label htmlFor="member-institution" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.institution} *
                        </label>
                        <input
                          id="member-institution"
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder={t.membershipForm.institutionPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Department */}
                      <div>
                        <label htmlFor="member-department" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.department}
                        </label>
                        <input
                          id="member-department"
                          type="text"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder={t.membershipForm.departmentPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Member Type */}
                      <div>
                        <label htmlFor="member-type" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.memberType} *
                        </label>
                        <select
                          id="member-type"
                          value={memberType}
                          onChange={(e) => setMemberType(e.target.value as "STUDENT" | "PROFESSIONAL")}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text" : "bg-white border-cy-border"}`}
                        >
                          <option value="STUDENT">{t.membershipForm.student}</option>
                          <option value="PROFESSIONAL">{t.membershipForm.professional}</option>
                        </select>
                      </div>

                      {/* District */}
                      <div>
                        <label htmlFor="member-district" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.district}
                        </label>
                        <input
                          id="member-district"
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          placeholder={t.membershipForm.districtPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Interests */}
                      <div>
                        <label htmlFor="member-interests" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.membershipForm.interests}
                        </label>
                        <input
                          id="member-interests"
                          type="text"
                          value={interests}
                          onChange={(e) => setInterests(e.target.value)}
                          placeholder={t.membershipForm.interestsPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>
                    </div>

                    {/* Motivation */}
                    <div>
                      <label htmlFor="member-motivation" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {t.membershipForm.motivation} *
                      </label>
                      <textarea
                        id="member-motivation"
                        rows={4}
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        placeholder={t.membershipForm.motivationPlaceholder}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        id="member-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-cy-border text-cy-green focus:ring-cy-green/30"
                      />
                      <label htmlFor="member-consent" className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                        {t.membershipForm.consent}
                      </label>
                    </div>

                    {error && (
                      <p className="text-sm text-cy-red">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.membershipForm.submitting}
                        </>
                      ) : (
                        t.membershipForm.submit
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Volunteer With CYB - Form */}
          <div
            id="volunteer"
            className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 mb-8 ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center bg-cy-red-50`}>
                <Heart className="w-7 h-7 text-cy-red" />
              </div>
              <div className="flex-1">
                <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-3 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  {t.volunteerForm.title}
                </h2>
                <p className={`leading-relaxed mb-6 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                  {t.volunteerForm.subtitle}
                </p>

                {volSubmitted ? (
                  <div className="flex items-center gap-3 p-6 bg-cy-green-50 dark:bg-cy-green-50/10 rounded-2xl border border-cy-green/20">
                    <CheckCircle className="w-6 h-6 text-cy-green flex-shrink-0" />
                    <p className="text-cy-green-dark dark:text-cy-green font-medium">
                      {t.volunteerForm.success}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVolSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="vol-fullName" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.fullName} *
                        </label>
                        <input
                          id="vol-fullName"
                          type="text"
                          value={volFullName}
                          onChange={(e) => setVolFullName(e.target.value)}
                          placeholder={t.volunteerForm.fullNamePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="vol-email" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.email} *
                        </label>
                        <input
                          id="vol-email"
                          type="email"
                          value={volEmail}
                          onChange={(e) => setVolEmail(e.target.value)}
                          placeholder={t.volunteerForm.emailPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="vol-phone" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.phone} *
                        </label>
                        <input
                          id="vol-phone"
                          type="tel"
                          value={volPhone}
                          onChange={(e) => setVolPhone(e.target.value)}
                          placeholder={t.volunteerForm.phonePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Institution */}
                      <div>
                        <label htmlFor="vol-institution" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.institution}
                        </label>
                        <input
                          id="vol-institution"
                          type="text"
                          value={volInstitution}
                          onChange={(e) => setVolInstitution(e.target.value)}
                          placeholder={t.volunteerForm.institutionPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label htmlFor="vol-skills" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.skills}
                        </label>
                        <input
                          id="vol-skills"
                          type="text"
                          value={volSkills}
                          onChange={(e) => setVolSkills(e.target.value)}
                          placeholder={t.volunteerForm.skillsPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Interests */}
                      <div>
                        <label htmlFor="vol-interests" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.interests}
                        </label>
                        <input
                          id="vol-interests"
                          type="text"
                          value={volInterests}
                          onChange={(e) => setVolInterests(e.target.value)}
                          placeholder={t.volunteerForm.interestsPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <label htmlFor="vol-experience" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {t.volunteerForm.experience}
                      </label>
                      <textarea
                        id="vol-experience"
                        rows={3}
                        value={volExperience}
                        onChange={(e) => setVolExperience(e.target.value)}
                        placeholder={t.volunteerForm.experiencePlaceholder}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Availability */}
                      <div>
                        <label htmlFor="vol-availability" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.availability}
                        </label>
                        <input
                          id="vol-availability"
                          type="text"
                          value={volAvailability}
                          onChange={(e) => setVolAvailability(e.target.value)}
                          placeholder={t.volunteerForm.availabilityPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Portfolio URL */}
                      <div>
                        <label htmlFor="vol-portfolioUrl" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.volunteerForm.portfolioUrl}
                        </label>
                        <input
                          id="vol-portfolioUrl"
                          type="url"
                          value={volPortfolioUrl}
                          onChange={(e) => setVolPortfolioUrl(e.target.value)}
                          placeholder={t.volunteerForm.portfolioUrlPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>
                    </div>

                    {/* Motivation */}
                    <div>
                      <label htmlFor="vol-motivation" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {t.volunteerForm.motivation} *
                      </label>
                      <textarea
                        id="vol-motivation"
                        rows={4}
                        value={volMotivation}
                        onChange={(e) => setVolMotivation(e.target.value)}
                        placeholder={t.volunteerForm.motivationPlaceholder}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        id="vol-consent"
                        type="checkbox"
                        checked={volConsent}
                        onChange={(e) => setVolConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-cy-border text-cy-green focus:ring-cy-green/30"
                      />
                      <label htmlFor="vol-consent" className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                        {t.volunteerForm.consent}
                      </label>
                    </div>

                    {volError && (
                      <p className="text-sm text-cy-red">{volError}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={volSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-red text-white font-semibold rounded-xl hover:bg-cy-red-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {volSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.volunteerForm.submitting}
                        </>
                      ) : (
                        t.volunteerForm.submit
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Partner With Us - Form */}
          <div
            id="partner"
            className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 mb-8 ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8">
              <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center bg-cy-green-50`}>
                <Handshake className="w-7 h-7 text-cy-green" />
              </div>
              <div className="flex-1">
                <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-3 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                  {t.partnershipForm.title}
                </h2>
                <p className={`leading-relaxed mb-6 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                  {t.partnershipForm.subtitle}
                </p>

                {partnerSubmitted ? (
                  <div className="flex items-center gap-3 p-6 bg-cy-green-50 dark:bg-cy-green-50/10 rounded-2xl border border-cy-green/20">
                    <CheckCircle className="w-6 h-6 text-cy-green flex-shrink-0" />
                    <p className="text-cy-green-dark dark:text-cy-green font-medium">
                      {t.partnershipForm.success}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePartnerSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Organization Name */}
                      <div>
                        <label htmlFor="partner-orgName" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.partnershipForm.organizationName} *
                        </label>
                        <input
                          id="partner-orgName"
                          type="text"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder={t.partnershipForm.organizationNamePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Contact Person */}
                      <div>
                        <label htmlFor="partner-contactPerson" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.partnershipForm.contactPerson} *
                        </label>
                        <input
                          id="partner-contactPerson"
                          type="text"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                          placeholder={t.partnershipForm.contactPersonPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="partner-email" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.partnershipForm.email} *
                        </label>
                        <input
                          id="partner-email"
                          type="email"
                          value={partnerEmail}
                          onChange={(e) => setPartnerEmail(e.target.value)}
                          placeholder={t.partnershipForm.emailPlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="partner-phone" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.partnershipForm.phone}
                        </label>
                        <input
                          id="partner-phone"
                          type="tel"
                          value={partnerPhone}
                          onChange={(e) => setPartnerPhone(e.target.value)}
                          placeholder={t.partnershipForm.phonePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Organization Type */}
                      <div>
                        <label htmlFor="partner-orgType" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.partnershipForm.organizationType}
                        </label>
                        <input
                          id="partner-orgType"
                          type="text"
                          value={orgType}
                          onChange={(e) => setOrgType(e.target.value)}
                          placeholder={t.partnershipForm.organizationTypePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>

                      {/* Website */}
                      <div>
                        <label htmlFor="partner-website" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                          {t.partnershipForm.website}
                        </label>
                        <input
                          id="partner-website"
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder={t.partnershipForm.websitePlaceholder}
                          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                        />
                      </div>
                    </div>

                    {/* Partnership Interest */}
                    <div>
                      <label htmlFor="partner-interest" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {t.partnershipForm.partnershipInterest} *
                      </label>
                      <textarea
                        id="partner-interest"
                        rows={3}
                        value={partnershipInterest}
                        onChange={(e) => setPartnershipInterest(e.target.value)}
                        placeholder={t.partnershipForm.partnershipInterestPlaceholder}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="partner-message" className={`block text-sm font-medium mb-1.5 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {t.partnershipForm.message} *
                      </label>
                      <textarea
                        id="partner-message"
                        rows={4}
                        value={partnerMessage}
                        onChange={(e) => setPartnerMessage(e.target.value)}
                        placeholder={t.partnershipForm.messagePlaceholder}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cy-green/30 focus:border-cy-green transition-all resize-none ${theme === "dark" ? "bg-dark-bg border-dark-border text-dark-text placeholder:text-dark-muted" : "bg-white border-cy-border"}`}
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        id="partner-consent"
                        type="checkbox"
                        checked={partnerConsent}
                        onChange={(e) => setPartnerConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-cy-border text-cy-green focus:ring-cy-green/30"
                      />
                      <label htmlFor="partner-consent" className={`text-sm ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                        {t.partnershipForm.consent}
                      </label>
                    </div>

                    {partnerError && (
                      <p className="text-sm text-cy-red">{partnerError}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={partnerSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cy-green text-white font-semibold rounded-xl hover:bg-cy-green-dark transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {partnerSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {t.partnershipForm.submitting}
                        </>
                      ) : (
                        t.partnershipForm.submit
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Other Involvement Options */}
          <div className="space-y-8">
            {involvementKeys.map((key) => {
              const isGreen = colorMap[key] === "green";
              const Icon = iconMap[key];
              const option = t.getInvolved[key];
              return (
                <div
                  key={key}
                  id={key}
                  className={`scroll-mt-24 rounded-2xl border p-8 lg:p-10 hover:shadow-lg transition-all duration-300 ${theme === "dark" ? "border-dark-border" : "border-cy-border"}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div
                      className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${
                        isGreen ? "bg-cy-green-50" : "bg-cy-red-50"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          isGreen ? "text-cy-green" : "text-cy-red"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className={`font-[family-name:var(--font-heading)] text-2xl font-bold mb-3 ${theme === "dark" ? "text-dark-text" : "text-cy-dark"}`}>
                        {option.title}
                      </h2>
                      <p className={`leading-relaxed mb-4 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                        {option.description}
                      </p>
                      <div className={`rounded-xl p-4 border ${theme === "dark" ? "bg-dark-card border-dark-border" : "bg-cy-light border-cy-border"}`}>
                        <p className={`text-sm flex items-center gap-2 ${theme === "dark" ? "text-dark-muted" : "text-cy-gray"}`}>
                          <ArrowRight className="w-4 h-4 text-cy-green flex-shrink-0" />
                          {option.cta}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
