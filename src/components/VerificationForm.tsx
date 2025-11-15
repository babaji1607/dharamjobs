"use client";

import { useState } from "react";
import { VerifiedUser } from "@/types";

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
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-orange-700 mb-2">Verification Required</h2>
            <p className="text-gray-600 mb-6">
                To maintain the integrity of our dharmic community, please verify your identity before posting jobs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your full name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="+91 XXXXXXXXXX"
                    />
                </div>

                <div className="border-t pt-4 mt-4 space-y-3">
                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="confirmHindu"
                            name="confirmHindu"
                            checked={formData.confirmHindu}
                            onChange={handleChange}
                            className="h-4 w-4 mt-1 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="confirmHindu" className="ml-3 block text-sm text-gray-700">
                            <span className="font-medium">I confirm that I am a Hindu *</span>
                            <p className="text-gray-500 mt-1">
                                This portal is exclusively for the Hindu community to preserve our dharmic values and prevent sabotage.
                            </p>
                        </label>
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            id="confirmNonSabotage"
                            name="confirmNonSabotage"
                            checked={formData.confirmNonSabotage}
                            onChange={handleChange}
                            className="h-4 w-4 mt-1 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="confirmNonSabotage" className="ml-3 block text-sm text-gray-700">
                            <span className="font-medium">I commit to posting genuine job opportunities *</span>
                            <p className="text-gray-500 mt-1">
                                I will not use this platform for any malicious purposes or to harm the dharmic community.
                            </p>
                        </label>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Verify & Continue
                    </button>
                </div>
            </form>
        </div>
    );
}
