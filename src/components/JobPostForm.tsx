"use client";

import { useState } from "react";
import { Job, INDIAN_STATES, VerifiedUser, JOB_TYPES, JobType, LANGUAGES, Language } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface JobPostFormProps {
    onSubmit: (job: Omit<Job, "id" | "postedDate">) => void;
    verifiedUser: VerifiedUser;
    onCancel: () => void;
}

export default function JobPostForm({ onSubmit, verifiedUser, onCancel }: JobPostFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        state: "",
        city: "",
        jobType: "" as JobType | "",
        salaryMin: "",
        salaryMax: "",
        languages: [] as Language[],
        isFamilyEnterprise: false,
        contactEmail: "",
        contactPhone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: formData.title,
            company: formData.company,
            description: formData.description,
            state: formData.state,
            city: formData.city,
            jobType: (formData.jobType || JOB_TYPES[0]) as JobType,
            salary: {
                min: parseInt(formData.salaryMin) || 0,
                max: parseInt(formData.salaryMax) || 0,
                currency: "INR",
                period: "monthly",
            },
            languages: formData.languages,
            isFamilyEnterprise: formData.isFamilyEnterprise,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone,
            postedBy: verifiedUser,
        });
        // Reset form
        setFormData({
            title: "",
            company: "",
            description: "",
            state: "",
            city: "",
            jobType: "",
            salaryMin: "",
            salaryMax: "",
            languages: [],
            isFamilyEnterprise: false,
            contactEmail: "",
            contactPhone: "",
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const toggleLanguage = (language: Language) => {
        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.includes(language)
                ? prev.languages.filter((lang) => lang !== language)
                : [...prev.languages, language],
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-orange-100 bg-white/95 p-6 sm:p-8 shadow-xl space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Post a Dharmic Job</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                    Share opportunities with the community in just a few quick steps.
                </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4">
                <p className="text-sm text-green-800">
                    ✓ Verified as <span className="font-semibold">{verifiedUser.name}</span> ({verifiedUser.email})
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Temple Priest"
                        className="h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization *</Label>
                    <Input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g., Shri Ram Mandir Trust"
                        className="h-12"
                    />
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <select
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="h-12 w-full rounded-2xl border border-input bg-white px-4 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g., Ayodhya"
                        className="h-12"
                    />
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type *</Label>
                    <select
                        id="jobType"
                        name="jobType"
                        required
                        value={formData.jobType}
                        onChange={handleChange}
                        className="h-12 w-full rounded-2xl border border-input bg-white px-4 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                        <option value="">Select job type</option>
                        {JOB_TYPES.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone *</Label>
                    <Input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        required
                        value={formData.contactPhone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="h-12"
                    />
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        required
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="contact@example.com"
                        className="h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="isFamilyEnterprise">Enterprise Type</Label>
                    <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, isFamilyEnterprise: !prev.isFamilyEnterprise }))}
                        className={`h-12 w-full rounded-2xl border px-4 text-left font-medium transition-colors ${formData.isFamilyEnterprise ? 'border-orange-400 bg-orange-50 text-orange-900' : 'border-input text-muted-foreground hover:border-orange-200'}`}
                    >
                        {formData.isFamilyEnterprise ? 'Family Enterprise' : 'Not a Family Enterprise'}
                    </button>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="salaryMin">Minimum Salary (₹)*</Label>
                    <Input
                        type="number"
                        id="salaryMin"
                        name="salaryMin"
                        required
                        value={formData.salaryMin}
                        onChange={handleChange}
                        placeholder="e.g., 15000"
                        className="h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salaryMax">Maximum Salary (₹)*</Label>
                    <Input
                        type="number"
                        id="salaryMax"
                        name="salaryMax"
                        required
                        value={formData.salaryMax}
                        onChange={handleChange}
                        placeholder="e.g., 30000"
                        className="h-12"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label>Languages Required *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {LANGUAGES.map((language) => (
                        <button
                            type="button"
                            key={language}
                            onClick={() => toggleLanguage(language)}
                            className={`rounded-2xl border px-3 py-2 text-sm font-medium transition-colors ${formData.languages.includes(language)
                                ? 'border-orange-400 bg-orange-50 text-orange-900'
                                : 'border-input text-muted-foreground hover:border-orange-200'}`}
                        >
                            {language}
                        </button>
                    ))}
                </div>
                {formData.languages.length === 0 && (
                    <p className="text-xs text-muted-foreground">Select at least one language.</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the role, responsibilities, and qualifications."
                    className="min-h-40"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={formData.languages.length === 0}
                >
                    Post Job
                </Button>
            </div>
        </form>
    );
}
