"use client";

import { useState } from "react";
import { JobApplication } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface JobApplicationFormProps {
    jobTitle: string;
    onSubmit: (application: Omit<JobApplication, "id" | "appliedDate">) => void;
    onCancel: () => void;
}

export default function JobApplicationForm({ jobTitle, onSubmit, onCancel }: JobApplicationFormProps) {
    const [formData, setFormData] = useState({
        applicantName: "",
        applicantEmail: "",
        applicantPhone: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 sm:p-8 shadow-xl space-y-4">
            <div>
                <p className="text-sm uppercase tracking-wide text-orange-500 font-semibold">Apply now</p>
                <h3 className="text-2xl font-bold text-slate-900">{jobTitle}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Fill in your details to express interest in this opportunity.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="applicantName">Your Name *</Label>
                    <Input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        required
                        value={formData.applicantName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="applicantEmail">Email Address *</Label>
                    <Input
                        type="email"
                        id="applicantEmail"
                        name="applicantEmail"
                        required
                        value={formData.applicantEmail}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="applicantPhone">Phone Number *</Label>
                    <Input
                        type="tel"
                        id="applicantPhone"
                        name="applicantPhone"
                        required
                        value={formData.applicantPhone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Cover Message *</Label>
                    <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell the employer why you're excited about this position..."
                        className="min-h-[140px]"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-3">
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
                    >
                        Submit Application
                    </Button>
                </div>
            </form>
        </div>
    );
}
