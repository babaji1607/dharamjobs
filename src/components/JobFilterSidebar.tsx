"use client";

import { INDIAN_STATES, JobType, LANGUAGES, Language } from "@/types";
import { useLocale } from "@/contexts/LocaleContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, Home, DollarSign, Lightbulb, Building2, Languages } from "lucide-react";

export interface JobFilters {
    searchTerm: string;
    state: string;
    city: string;
    jobType: JobType | "all";
    showFamilyOnly: boolean;
    salaryMin: number;
    salaryMax: number;
    languages: Language[];
}

interface JobFilterSidebarProps {
    filters: JobFilters;
    onFilterChange: (filters: JobFilters) => void;
    jobCount: number;
    availableCities: string[];
}

const JOB_TYPES: (JobType | "all")[] = ["all", "Full-time", "Part-time", "Contract", "Freelance", "Internship"];

export const DEFAULT_JOB_FILTERS: JobFilters = {
    searchTerm: "",
    state: "all",
    city: "all",
    jobType: "all",
    showFamilyOnly: false,
    salaryMin: 0,
    salaryMax: 1000000,
    languages: [],
};

export default function JobFilterSidebar({ filters, onFilterChange, jobCount, availableCities }: JobFilterSidebarProps) {
    const { t } = useLocale();

    const updateFilter = (key: keyof JobFilters, value: JobFilters[keyof JobFilters]) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const resetFilters = () => {
        onFilterChange({ ...DEFAULT_JOB_FILTERS, languages: [] });
    };

    const toggleLanguage = (language: Language) => {
        const updated = filters.languages.includes(language)
            ? filters.languages.filter((lang) => lang !== language)
            : [...filters.languages, language];
        updateFilter('languages', updated);
    };

    const hasActiveFilters =
        filters.searchTerm.trim().length > 0 ||
        filters.state !== "all" ||
        filters.city !== "all" ||
        filters.jobType !== "all" ||
        filters.showFamilyOnly ||
        filters.salaryMin > 0 ||
        filters.salaryMax < 1000000 ||
        filters.languages.length > 0;

    return (
        <Card className="sticky top-24 rounded-3xl border border-orange-100/70 bg-white/90 shadow-xl transition-shadow hover:shadow-2xl">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <CardTitle className="text-2xl font-bold">Smart Filters</CardTitle>
                        <p className="text-sm text-muted-foreground">Dial in roles that truly matter to you.</p>
                    </div>
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-orange-600">
                            Clear
                        </Button>
                    )}
                </div>
                <div className="mt-4">
                    <Badge variant="secondary" className="text-base px-3 py-1.5">
                        {jobCount} {jobCount === 1 ? 'Job' : 'Jobs'} found
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* Search */}
                <div className="space-y-3">
                    <Label htmlFor="sidebar-search" className="text-base font-semibold flex items-center gap-2">
                        <Search className="h-5 w-5 text-orange-600" />
                        Search roles
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="sidebar-search"
                            value={filters.searchTerm}
                            onChange={(e) => updateFilter('searchTerm', e.target.value)}
                            placeholder="Title, company, city..."
                            className="h-12 rounded-2xl bg-orange-50/60 pl-11 text-base"
                        />
                    </div>
                </div>

                <Separator />

                {/* Location Filter */}
                <div className="space-y-5">
                    <div className="space-y-3">
                        <Label htmlFor="state-filter" className="text-base font-semibold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-orange-600" />
                            State
                        </Label>
                        <Select
                            value={filters.state}
                            onValueChange={(value) => updateFilter('state', value)}
                        >
                            <SelectTrigger id="state-filter" className="h-12 rounded-2xl">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="all">All States</SelectItem>
                                {INDIAN_STATES.map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="city-filter" className="text-base font-semibold flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-orange-600" />
                            City
                        </Label>
                        <Select
                            value={filters.city}
                            onValueChange={(value) => updateFilter('city', value)}
                        >
                            <SelectTrigger id="city-filter" className="h-12 rounded-2xl">
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[260px]">
                                <SelectItem value="all">All Cities</SelectItem>
                                {availableCities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                        {city}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Separator />

                {/* Job Type Filter */}
                <div className="space-y-3">
                    <Label htmlFor="job-type-filter" className="text-base font-semibold flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-orange-600" />
                        Job Type
                    </Label>
                    <Select
                        value={filters.jobType}
                        onValueChange={(value) => updateFilter('jobType', value)}
                    >
                        <SelectTrigger id="job-type-filter" className="h-12 rounded-2xl">
                            <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {JOB_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type === "all" ? "All Types" : type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                {/* Family Enterprise Filter */}
                <div className="space-y-3">
                    <Label className="text-base font-semibold flex items-center gap-2">
                        <Home className="h-5 w-5 text-orange-600" />
                        Enterprise Type
                    </Label>
                    <div className="flex items-center space-x-3 rounded-2xl border border-orange-100 p-4 hover:border-orange-200">
                        <Checkbox
                            id="family-enterprise"
                            checked={filters.showFamilyOnly}
                            onCheckedChange={(checked) => updateFilter('showFamilyOnly', checked === true)}
                            className="h-5 w-5"
                        />
                        <label
                            htmlFor="family-enterprise"
                            className="text-base leading-none cursor-pointer"
                        >
                            Family Enterprises Only
                        </label>
                    </div>
                </div>

                <Separator />

                {/* Salary Range Filter */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-orange-600" />
                        Salary Range (₹)
                    </Label>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Label htmlFor="salary-min" className="text-sm text-muted-foreground w-16">
                                Min
                            </Label>
                            <Input
                                id="salary-min"
                                type="number"
                                min="0"
                                step="1000"
                                value={filters.salaryMin}
                                onChange={(e) => updateFilter('salaryMin', parseInt(e.target.value) || 0)}
                                className="h-11"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Label htmlFor="salary-max" className="text-sm text-muted-foreground w-16">
                                Max
                            </Label>
                            <Input
                                id="salary-max"
                                type="number"
                                min="0"
                                step="1000"
                                value={filters.salaryMax}
                                onChange={(e) => updateFilter('salaryMax', parseInt(e.target.value) || 1000000)}
                                className="h-11"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mt-2">
                            ₹{filters.salaryMin.toLocaleString('en-IN')} - ₹{filters.salaryMax.toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Language Filter */}
                <div className="space-y-4">
                    <Label className="text-base font-semibold flex items-center gap-2">
                        <Languages className="h-5 w-5 text-orange-600" />
                        Preferred Languages
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                        {LANGUAGES.map((language) => (
                            <label
                                key={language}
                                htmlFor={`lang-${language}`}
                                className={`flex items-center space-x-2 rounded-2xl border px-3 py-2 text-sm font-medium transition-colors ${filters.languages.includes(language)
                                    ? 'border-orange-400 bg-orange-50 text-orange-900'
                                    : 'border-muted/60 hover:border-orange-200'}
                                `}
                            >
                                <Checkbox
                                    id={`lang-${language}`}
                                    checked={filters.languages.includes(language)}
                                    onCheckedChange={() => toggleLanguage(language)}
                                />
                                <span>{language}</span>
                            </label>
                        ))}
                    </div>
                    {filters.languages.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                            Matching any of: {filters.languages.join(', ')}
                        </p>
                    )}
                </div>

                <Separator />

                {/* Info Section */}
                <div className="rounded-2xl bg-orange-50 dark:bg-orange-950/20 p-5 border border-orange-100 dark:border-orange-900/30">
                    <p className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed">
                        <Lightbulb className="h-5 w-5 mt-0.5 shrink-0 text-orange-600" />
                        <span>Use the search plus layered filters to keep results relevant. Your selections persist while you explore.</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
