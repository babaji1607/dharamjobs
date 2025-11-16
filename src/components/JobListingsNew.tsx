"use client";

import { Job, JobApplication } from "@/types";
import { useMemo, useState } from "react";
import JobApplicationModal from "./JobApplicationModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Mail, Phone, Building2, Users, IndianRupee, Briefcase, Languages } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface JobListingsProps {
    jobs: Job[];
    onJobApply: (jobId: string, application: Omit<JobApplication, "id" | "appliedDate">) => void;
}

export default function JobListingsNew({ jobs, onJobApply }: JobListingsProps) {
    const { t, locale } = useLocale();
    const [applyingToJob, setApplyingToJob] = useState<Job | null>(null);
    const salaryFormatter = useMemo(() => new Intl.NumberFormat('en-IN'), []);

    const getTranslated = (content: string | Record<string, string>): string => {
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || content['hi'] || Object.values(content)[0] || '';
    };

    const formatSalary = (salary: { min: number; max: number; currency: string; period: string }) => {
        return `₹${salaryFormatter.format(salary.min)} - ₹${salaryFormatter.format(salary.max)}/month`;
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleApplicationSubmit = (application: Omit<JobApplication, "id" | "appliedDate">) => {
        if (applyingToJob) {
            onJobApply(applyingToJob.id, application);
            setApplyingToJob(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-sm">
                <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                    {t('job_listing.jobs')} {t('job_listing.found')}
                </p>
                <h2 className="text-3xl font-bold mt-1">
                    {jobs.length} {jobs.length === 1 ? t('job_listing.job') : t('job_listing.jobs')}
                </h2>
                <p className="text-muted-foreground mt-2">
                    Refine further using the left sidebar – results update instantly.
                </p>
            </div>

            <div className="space-y-4">
                {jobs.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            {t('job_listing.no_jobs')}
                        </CardContent>
                    </Card>
                ) : (
                    jobs.map((job) => (
                        <Card key={job.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-2 flex-wrap">
                                            <CardTitle className="text-xl">{getTranslated(job.title)}</CardTitle>
                                            {job.isFamilyEnterprise && (
                                                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                                    <Users className="w-3 h-3 mr-1" />
                                                    {t('job_listing.family_enterprise_badge')}
                                                </Badge>
                                            )}
                                            <Badge variant="outline">
                                                <Briefcase className="w-3 h-3 mr-1" />
                                                {job.jobType}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-base font-medium text-primary">
                                            <Building2 className="w-4 h-4 inline mr-1" />
                                            {job.company}
                                        </CardDescription>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {job.city}, {job.state}
                                    </span>
                                    <span className="flex items-center gap-1 font-medium text-primary">
                                        <IndianRupee className="w-4 h-4" />
                                        {formatSalary(job.salary)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {t('job_listing.posted')} {formatDate(job.postedDate)}
                                    </span>
                                    {job.languages.length > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Languages className="w-4 h-4" />
                                            <span className="flex gap-1 flex-wrap">
                                                {job.languages.map((lang) => (
                                                    <Badge key={lang} variant="secondary" className="text-xs">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                            </span>
                                        </span>
                                    )}
                                    {job.applications && job.applications.length > 0 && (
                                        <Badge variant="outline">
                                            {job.applications.length} {job.applications.length === 1 ? t('job_listing.applicant') : t('job_listing.applicants')}
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm whitespace-pre-line">{getTranslated(job.description)}</p>
                                </div>

                                <Separator />

                                <div>
                                    <h4 className="text-sm font-semibold mb-3">Contact Information</h4>
                                    <div className="flex flex-col sm:flex-row gap-3 text-sm">
                                        <a
                                            href={`mailto:${job.contactEmail}`}
                                            className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <Mail className="w-4 h-4" />
                                            {job.contactEmail}
                                        </a>
                                        <a
                                            href={`tel:${job.contactPhone}`}
                                            className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <Phone className="w-4 h-4" />
                                            {job.contactPhone}
                                        </a>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    onClick={() => setApplyingToJob(job)}
                                    className="w-full"
                                    size="lg"
                                >
                                    {t('common.apply')}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            {/* Application Modal */}
            {applyingToJob && (
                <JobApplicationModal
                    open={!!applyingToJob}
                    onOpenChange={(open) => !open && setApplyingToJob(null)}
                    jobTitle={getTranslated(applyingToJob.title)}
                    companyName={applyingToJob.company}
                    onSubmit={handleApplicationSubmit}
                />
            )}
        </div>
    );
}
