"use client";

import { Job, INDIAN_STATES, JobApplication } from "@/types";
import { useState } from "react";
import JobApplicationForm from "./JobApplicationForm";

interface JobListingsProps {
    jobs: Job[];
    onJobApply: (jobId: string, application: Omit<JobApplication, "id" | "appliedDate">) => void;
}

export default function JobListings({ jobs, onJobApply }: JobListingsProps) {
    const [selectedState, setSelectedState] = useState<string>("all");
    const [showFamilyOnly, setShowFamilyOnly] = useState<boolean>(false);
    const [applyingToJobId, setApplyingToJobId] = useState<string | null>(null);

    const filteredJobs = jobs.filter((job) => {
        const stateMatch = selectedState === "all" || job.state === selectedState;
        const familyMatch = !showFamilyOnly || job.isFamilyEnterprise;
        return stateMatch && familyMatch;
    });

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleApplicationSubmit = (jobId: string, application: Omit<JobApplication, "id" | "appliedDate">) => {
        onJobApply(jobId, application);
        setApplyingToJobId(null);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-orange-700 mb-4">
                    Available Jobs ({filteredJobs.length})
                </h2>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                            Filter by State
                        </label>
                        <select
                            id="stateFilter"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="all">All States</option>
                            {INDIAN_STATES.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showFamilyOnly}
                                onChange={(e) => setShowFamilyOnly(e.target.checked)}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Family Enterprises Only</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                        No jobs found matching your filters. Post the first job!
                    </div>
                ) : (
                    filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500"
                        >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                        {job.isFamilyEnterprise && (
                                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                                                Family Enterprise
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-lg text-orange-600 font-medium mb-2">{job.company}</p>

                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {job.state}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Posted {formatDate(job.postedDate)}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 mb-4 whitespace-pre-line">{job.description}</p>

                                    <div className="border-t pt-4 mt-4">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">Contact Information:</p>
                                        <div className="flex flex-col sm:flex-row gap-3 text-sm">
                                            <a
                                                href={`mailto:${job.contactEmail}`}
                                                className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {job.contactEmail}
                                            </a>
                                            <a
                                                href={`tel:${job.contactPhone}`}
                                                className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                {job.contactPhone}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Apply Button */}
                                    {applyingToJobId !== job.id && (
                                        <div className="mt-4">
                                            <button
                                                onClick={() => setApplyingToJobId(job.id)}
                                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                                            >
                                                Apply for this Job
                                            </button>
                                            {job.applications && job.applications.length > 0 && (
                                                <p className="text-xs text-gray-500 mt-2 text-center">
                                                    {job.applications.length} {job.applications.length === 1 ? 'application' : 'applications'} received
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Application Form */}
                                    {applyingToJobId === job.id && (
                                        <div className="mt-4">
                                            <JobApplicationForm
                                                jobTitle={job.title}
                                                onSubmit={(application) => handleApplicationSubmit(job.id, application)}
                                                onCancel={() => setApplyingToJobId(null)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
