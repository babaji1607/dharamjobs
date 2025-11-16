"use client";

import { useState } from "react";
import { VerifiedUser } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VerificationFormProps {
    onVerified: (user: VerifiedUser) => void;
    onCancel: () => void;
}

export default function VerificationForm({ onVerified, onCancel }: VerificationFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        confirmHindu: false,
        confirmNonSabotage: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const verifiedUser: VerifiedUser = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            verifiedDate: new Date(),
        };

        onVerified(verifiedUser);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const isFormValid =
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.confirmHindu &&
        formData.confirmNonSabotage;

    return (
        <div className="mx-auto max-w-2xl rounded-3xl border border-orange-100 bg-white/95 p-6 sm:p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-slate-900">Verification Required</h2>
            <p className="text-muted-foreground mt-2">
                To maintain the integrity of our dharmic community, please verify your identity before posting jobs.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="h-12"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="h-12"
                    />
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4 space-y-4">
                    <label htmlFor="confirmHindu" className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="confirmHindu"
                            name="confirmHindu"
                            checked={formData.confirmHindu}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 rounded border-orange-200 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-slate-900">
                            <span className="font-semibold">I confirm that I am a Hindu *</span>
                            <p className="text-muted-foreground">
                                This portal is exclusively for the Hindu community to preserve our dharmic values and prevent sabotage.
                            </p>
                        </span>
                    </label>

                    <label htmlFor="confirmNonSabotage" className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="confirmNonSabotage"
                            name="confirmNonSabotage"
                            checked={formData.confirmNonSabotage}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 rounded border-orange-200 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-slate-900">
                            <span className="font-semibold">I commit to posting genuine job opportunities *</span>
                            <p className="text-muted-foreground">
                                I will not use this platform for any malicious purposes or to harm the dharmic community.
                            </p>
                        </span>
                    </label>
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
                        disabled={!isFormValid}
                    >
                        Verify & Continue
                    </Button>
                </div>
            </form>
        </div>
    );
}
