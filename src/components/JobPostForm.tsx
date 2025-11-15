"use client";

import { useState } from "react";
import { Job, INDIAN_STATES, VerifiedUser } from "@/types";

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
        isFamilyEnterprise: false,
        contactEmail: "",
        contactPhone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            postedBy: verifiedUser,
        });
        // Reset form
        setFormData({
            title: "",
            company: "",
            description: "",
            state: "",
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

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold text-orange-700 mb-4">Post a Dharmic Job</h2>

            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                <p className="text-sm text-green-800">
                    ✓ Verified as: <span className="font-medium">{verifiedUser.name}</span> ({verifiedUser.email})
                </p>
            </div>

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Temple Priest, Sanskrit Teacher"
                />
            </div>

            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Organization *
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Shri Ram Mandir Trust"
                />
            </div>

            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                </label>
                <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe the job requirements, responsibilities, and qualifications..."
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="isFamilyEnterprise"
                    name="isFamilyEnterprise"
                    checked={formData.isFamilyEnterprise}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isFamilyEnterprise" className="ml-2 block text-sm text-gray-700">
                    This is a Family Enterprise
                </label>
            </div>

            <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email *
                </label>
                <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="contact@example.com"
                />
            </div>

            <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone *
                </label>
                <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    required
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="+91 XXXXXXXXXX"
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium"
                >
                    Post Job
                </button>
            </div>
        </form>
    );
}
