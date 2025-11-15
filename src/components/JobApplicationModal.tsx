"use client";

import { useState } from "react";
import { JobApplication } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/contexts/LocaleContext";

interface JobApplicationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    jobTitle: string;
    companyName: string;
    onSubmit: (application: Omit<JobApplication, "id" | "appliedDate">) => void;
}

export default function JobApplicationModal({
    open,
    onOpenChange,
    jobTitle,
    companyName,
    onSubmit
}: JobApplicationModalProps) {
    const { t } = useLocale();
    const [formData, setFormData] = useState({
        applicantName: "",
        applicantEmail: "",
        applicantPhone: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset form
        setFormData({
            applicantName: "",
            applicantEmail: "",
            applicantPhone: "",
            message: "",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{jobTitle}</DialogTitle>
                    <DialogDescription>
                        {companyName} • {t('job_application.submit_application')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="applicantName">{t('job_application.full_name')} *</Label>
                        <Input
                            type="text"
                            id="applicantName"
                            name="applicantName"
                            required
                            value={formData.applicantName}
                            onChange={handleChange}
                            placeholder={t('job_application.name_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="applicantEmail">{t('job_application.email')} *</Label>
                        <Input
                            type="email"
                            id="applicantEmail"
                            name="applicantEmail"
                            required
                            value={formData.applicantEmail}
                            onChange={handleChange}
                            placeholder={t('job_application.email_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="applicantPhone">{t('job_application.phone')} *</Label>
                        <Input
                            type="tel"
                            id="applicantPhone"
                            name="applicantPhone"
                            required
                            value={formData.applicantPhone}
                            onChange={handleChange}
                            placeholder={t('job_application.phone_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">{t('job_application.cover_letter')} *</Label>
                        <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            placeholder={t('job_application.cover_placeholder')}
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
                        <Button type="submit" className="flex-1">
                            {t('job_application.submit_application')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
