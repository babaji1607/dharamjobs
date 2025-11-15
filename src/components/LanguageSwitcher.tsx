"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { localeNames } from "@/contexts/LocaleContext";
import { useLocale } from "@/contexts/LocaleContext";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    return (
        <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary-foreground" />
            <Select value={locale} onValueChange={setLocale}>
                <SelectTrigger className="w-[140px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(localeNames).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
