"use client";

import { useState } from "react";
import { Job, INDIAN_STATES, JOB_TYPES, JobType, LANGUAGES, Language, VerifiedUser } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale, locales, localeNames, type Locale } from "@/contexts/LocaleContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobPostModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (job: Omit<Job, "id" | "postedDate">) => void;
    verifiedUser: VerifiedUser;
}

export default function JobPostModal({ open, onOpenChange, onSubmit, verifiedUser }: JobPostModalProps) {
    const { t } = useLocale();
    const [activeTab, setActiveTab] = useState<Locale>('hi');
    const [formData, setFormData] = useState({
        titles: Object.fromEntries(locales.map(l => [l, ''])) as Record<Locale, string>,
        descriptions: Object.fromEntries(locales.map(l => [l, ''])) as Record<Locale, string>,
        company: "",
        state: "",
        city: "",
        jobType: "" as JobType | "",
        salaryMin: "",
        salaryMax: "",
        languages: [] as Language[],
        isFamilyEnterprise: false,
        contactEmail: verifiedUser.email,
        contactPhone: verifiedUser.phone,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: formData.titles,
            description: formData.descriptions,
            company: formData.company,
            state: formData.state,
            city: formData.city,
            jobType: formData.jobType as JobType,
            languages: formData.languages,
            isFamilyEnterprise: formData.isFamilyEnterprise,
            contactEmail: formData.contactEmail,
            contactPhone: formData.contactPhone,
            salary: {
                min: parseInt(formData.salaryMin),
                max: parseInt(formData.salaryMax),
                currency: "INR",
                period: "monthly",
            },
            postedBy: verifiedUser,
        });
        // Reset form
        setFormData({
            titles: Object.fromEntries(locales.map(l => [l, ''])) as Record<Locale, string>,
            descriptions: Object.fromEntries(locales.map(l => [l, ''])) as Record<Locale, string>,
            company: "",
            state: "",
            city: "",
            jobType: "",
            salaryMin: "",
            salaryMax: "",
            languages: [],
            isFamilyEnterprise: false,
            contactEmail: verifiedUser.email,
            contactPhone: verifiedUser.phone,
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{t('job_post.title')}</DialogTitle>
                    <DialogDescription>
                        {t('job_post.description')}
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
                    <p className="text-sm text-green-800">
                        ✓ Verified as: <span className="font-medium">{verifiedUser.name}</span> ({verifiedUser.email})
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Locale)} className="w-full">
                        <TabsList className="grid w-full grid-cols-5 mb-4">
                            {locales.map(locale => (
                                <TabsTrigger key={locale} value={locale} className="text-xs">
                                    {localeNames[locale]}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {locales.map(locale => (
                            <TabsContent key={locale} value={locale} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`title-${locale}`}>{t('job_post.job_title')} ({localeNames[locale]}) *</Label>
                                    <Input
                                        id={`title-${locale}`}
                                        required
                                        value={formData.titles[locale]}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            titles: { ...prev.titles, [locale]: e.target.value }
                                        }))}
                                        placeholder={t('job_post.job_title_placeholder')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`description-${locale}`}>{t('job_post.job_description')} ({localeNames[locale]}) *</Label>
                                    <Textarea
                                        id={`description-${locale}`}
                                        required
                                        value={formData.descriptions[locale]}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            descriptions: { ...prev.descriptions, [locale]: e.target.value }
                                        }))}
                                        rows={5}
                                        placeholder={t('job_post.description_placeholder')}
                                    />
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    <div className="space-y-2">
                        <Label htmlFor="company">{t('job_post.company_name')} *</Label>
                        <Input
                            id="company"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={t('job_post.company_name')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">{t('job_post.location')} *</Label>
                        <Select
                            value={formData.state}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, state: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('job_post.select_state')} />
                            </SelectTrigger>
                            <SelectContent>
                                {INDIAN_STATES.map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">{t('job_post.city_name')} *</Label>
                        <Input
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            placeholder={t('job_post.city_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jobType">{t('job_post.job_type')} *</Label>
                        <Select
                            value={formData.jobType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, jobType: value as JobType }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('job_post.select_job_type')} />
                            </SelectTrigger>
                            <SelectContent>
                                {JOB_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="salaryMin">{t('job_post.min_salary')} *</Label>
                            <Input
                                type="number"
                                id="salaryMin"
                                name="salaryMin"
                                required
                                value={formData.salaryMin}
                                onChange={handleChange}
                                placeholder={t('job_post.min_salary')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salaryMax">{t('job_post.max_salary')} *</Label>
                            <Input
                                type="number"
                                id="salaryMax"
                                name="salaryMax"
                                required
                                value={formData.salaryMax}
                                onChange={handleChange}
                                placeholder={t('job_post.max_salary')}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Required Languages * (Select at least one)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-md">
                            {LANGUAGES.map((language) => (
                                <div key={language} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`lang-${language}`}
                                        checked={formData.languages.includes(language)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    languages: [...prev.languages, language],
                                                }));
                                            } else {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    languages: prev.languages.filter((l) => l !== language),
                                                }));
                                            }
                                        }}
                                    />
                                    <Label htmlFor={`lang-${language}`} className="cursor-pointer font-normal">
                                        {language}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {formData.languages.length === 0 && (
                            <p className="text-sm text-muted-foreground">Please select at least one language</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isFamilyEnterprise"
                            checked={formData.isFamilyEnterprise}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, isFamilyEnterprise: checked === true }))
                            }
                        />
                        <Label htmlFor="isFamilyEnterprise" className="cursor-pointer">
                            {t('job_post.family_enterprise')}
                        </Label>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contactEmail">{t('job_post.contact_email')} *</Label>
                        <Input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            required
                            value={formData.contactEmail}
                            onChange={handleChange}
                            placeholder={t('job_post.email_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contactPhone">{t('job_post.contact_phone')} *</Label>
                        <Input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            required
                            value={formData.contactPhone}
                            onChange={handleChange}
                            placeholder={t('job_post.phone_placeholder')}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1"
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={formData.languages.length === 0}
                        >
                            {t('common.post_job')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
