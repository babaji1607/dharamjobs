"use client";

import { useState } from "react";
import { JobApplication } from "@/types";

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
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-orange-300">
            <h3 className="text-xl font-bold text-orange-700 mb-2">Apply for: {jobTitle}</h3>
            <p className="text-gray-600 mb-4 text-sm">
                Fill in your details to express interest in this job opportunity.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        required
                        value={formData.applicantName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your full name"
                    />
                </div>

                <div>
                    <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="applicantEmail"
                        name="applicantEmail"
                        required
                        value={formData.applicantEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="applicantPhone"
                        name="applicantPhone"
                        required
                        value={formData.applicantPhone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="+91 XXXXXXXXXX"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Tell the employer why you're interested in this position..."
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
}
