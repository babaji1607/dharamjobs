"use client";

import { Job, INDIAN_STATES, JobApplication, JOB_TYPES, JobType, LANGUAGES, Language } from "@/types";
import { useState, useMemo } from "react";
import JobApplicationModal from "./JobApplicationModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Mail, Phone, Building2, Users, Search, IndianRupee, Briefcase, Languages } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface JobListingsProps {
    jobs: Job[];
    onJobApply: (jobId: string, application: Omit<JobApplication, "id" | "appliedDate">) => void;
}

export default function JobListings({ jobs, onJobApply }: JobListingsProps) {
    const { t, locale } = useLocale();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedState, setSelectedState] = useState<string>("all");
    const [selectedCity, setSelectedCity] = useState<string>("all");
    const [selectedJobType, setSelectedJobType] = useState<string>("all");
    const [minSalary, setMinSalary] = useState<string>("");
    const [maxSalary, setMaxSalary] = useState<string>("");
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
    const [showFamilyOnly, setShowFamilyOnly] = useState<boolean>(false);
    const [applyingToJob, setApplyingToJob] = useState<Job | null>(null);

    // Helper function to get translated content
    const getTranslated = (content: string | Record<string, string>): string => {
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || content['hi'] || Object.values(content)[0] || '';
    };

    // Get unique cities from jobs
    const uniqueCities = useMemo(() => {
        const cities = new Set(jobs.map(job => job.city));
        return Array.from(cities).sort();
    }, [jobs]);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            // Search query filter
            const title = getTranslated(job.title);
            const description = getTranslated(job.description);
            const matchesSearch = searchTerm === "" ||
                title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.city.toLowerCase().includes(searchTerm.toLowerCase());

            // Location filters
            const stateMatch = selectedState === "all" || job.state === selectedState;
            const cityMatch = selectedCity === "all" || job.city === selectedCity;

            // Job type filter
            const jobTypeMatch = selectedJobType === "all" || job.jobType === selectedJobType;

            // Family enterprise filter
            const familyMatch = !showFamilyOnly || job.isFamilyEnterprise;

            // Salary filter
            const minSalaryNum = minSalary ? parseInt(minSalary) : 0;
            const maxSalaryNum = maxSalary ? parseInt(maxSalary) : Infinity;
            const salaryMatch = job.salary.max >= minSalaryNum && job.salary.min <= maxSalaryNum;

            // Language filter
            const languageMatch = selectedLanguages.length === 0 ||
                selectedLanguages.some(lang => job.languages.includes(lang));

            return matchesSearch && stateMatch && cityMatch && jobTypeMatch && familyMatch && salaryMatch && languageMatch;
        });
    }, [jobs, searchTerm, selectedState, selectedCity, selectedJobType, minSalary, maxSalary, showFamilyOnly, selectedLanguages]);

    const formatSalary = (salary: { min: number; max: number; currency: string; period: string }) => {
        const formatter = new Intl.NumberFormat('en-IN');
        return `₹${formatter.format(salary.min)} - ₹${formatter.format(salary.max)}/month`;
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
            {/* Search Bar */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder={t('job_listing.search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {filteredJobs.length} {filteredJobs.length === 1 ? t('job_listing.job') : t('job_listing.jobs')} {t('job_listing.found')}
                    </CardTitle>
                    <CardDescription>{t('job_listing.refine_search')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* State Filter */}
                        <div className="space-y-2">
                            <Label>{t('job_listing.location_filter')}</Label>
                            <Select value={selectedState} onValueChange={setSelectedState}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('job_listing.all_states')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('job_listing.all_states')}</SelectItem>
                                    {INDIAN_STATES.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* City Filter */}
                        <div className="space-y-2">
                            <Label>{t('job_listing.city_filter')}</Label>
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('job_listing.all_cities')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('job_listing.all_cities')}</SelectItem>
                                    {uniqueCities.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Job Type Filter */}
                        <div className="space-y-2">
                            <Label>{t('job_listing.job_type_filter')}</Label>
                            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('job_listing.all_types')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('job_listing.all_types')}</SelectItem>
                                    {JOB_TYPES.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Salary Range */}
                        <div className="space-y-2">
                            <Label>{t('job_listing.min_salary_label')}</Label>
                            <Input
                                type="number"
                                placeholder={t('job_listing.min_salary_placeholder')}
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>{t('job_listing.max_salary_label')}</Label>
                            <Input
                                type="number"
                                placeholder={t('job_listing.max_salary_placeholder')}
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
                            />
                        </div>

                        {/* Family Enterprise Filter */}
                        <div className="flex items-center space-x-2 pt-8">
                            <Checkbox
                                id="familyOnly"
                                checked={showFamilyOnly}
                                onCheckedChange={(checked) => setShowFamilyOnly(checked === true)}
                            />
                            <Label htmlFor="familyOnly" className="cursor-pointer">
                                {t('job_listing.family_only')}
                            </Label>
                        </div>
                    </div>

                    <Separator />

                    {/* Language Filter */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Languages className="h-5 w-5 text-primary" />
                            <Label className="text-base font-semibold">Languages Required</Label>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-md">
                            {LANGUAGES.map((language) => (
                                <div key={language} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`lang-${language}`}
                                        checked={selectedLanguages.includes(language)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedLanguages([...selectedLanguages, language]);
                                            } else {
                                                setSelectedLanguages(selectedLanguages.filter(l => l !== language));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`lang-${language}`} className="cursor-pointer text-sm">
                                        {language}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {selectedLanguages.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                Showing jobs requiring any of: {selectedLanguages.join(", ")}
                            </p>
                        )}
                    </div>

                    {/* Clear Filters Button */}
                    {(searchTerm || selectedState !== "all" || selectedCity !== "all" || selectedJobType !== "all" || minSalary || maxSalary || showFamilyOnly || selectedLanguages.length > 0) && (
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedState("all");
                                    setSelectedCity("all");
                                    setSelectedJobType("all");
                                    setMinSalary("");
                                    setMaxSalary("");
                                    setShowFamilyOnly(false);
                                    setSelectedLanguages([]);
                                }}
                            >
                                {t('common.clear_all_filters')}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Job Cards */}
            <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            {t('job_listing.no_jobs')}
                        </CardContent>
                    </Card>
                ) : (
                    filteredJobs.map((job) => (
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
