"use client";

import { useState } from "react";
import { VerifiedUser } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale } from "@/contexts/LocaleContext";

interface VerificationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onVerified: (user: VerifiedUser) => void;
}

export default function VerificationModal({ open, onOpenChange, onVerified }: VerificationModalProps) {
    const { t } = useLocale();
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

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            confirmHindu: false,
            confirmNonSabotage: false,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isFormValid =
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.confirmHindu &&
        formData.confirmNonSabotage;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{t('verification.title')}</DialogTitle>
                    <DialogDescription>
                        {t('verification.description')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('job_application.full_name')} *</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('job_application.name_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('job_application.email')} *</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('job_application.email_placeholder')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">{t('job_application.phone')} *</Label>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t('job_application.phone_placeholder')}
                        />
                    </div>

                    <div className="border-t pt-4 space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="confirmHindu"
                                checked={formData.confirmHindu}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, confirmHindu: checked === true }))
                                }
                            />
                            <div className="space-y-1">
                                <Label htmlFor="confirmHindu" className="cursor-pointer font-medium">
                                    {t('verification.confirm_hindu')} *
                                </Label>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="confirmNonSabotage"
                                checked={formData.confirmNonSabotage}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, confirmNonSabotage: checked === true }))
                                }
                            />
                            <div className="space-y-1">
                                <Label htmlFor="confirmNonSabotage" className="cursor-pointer font-medium">
                                    {t('verification.confirm_values')} *
                                </Label>
                            </div>
                        </div>
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
                            disabled={!isFormValid}
                            className="flex-1"
                        >
                            {t('verification.verify_button')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
