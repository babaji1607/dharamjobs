"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";
import { Menu, Flower2, FileEdit } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
    onPostJobClick: () => void;
}

export default function Navbar({ onPostJobClick }: NavbarProps) {
    const { t } = useLocale();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all duration-300">
            <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 py-2 transition-transform hover:scale-105">
                    <Flower2 className="h-10 w-10 text-orange-600 transition-transform hover:rotate-12" />
                    <span className="font-bold text-2xl md:text-2xl bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                        {t('common.dharmic_jobs')}
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-10 text-base font-medium">
                    <Link href="/" className="transition-all hover:text-orange-600 hover:scale-110 py-2">
                        Home
                    </Link>
                    <Link href="#jobs" className="transition-all hover:text-orange-600 hover:scale-110 py-2">
                        Jobs
                    </Link>
                    <Link href="#about" className="transition-all hover:text-orange-600 hover:scale-110 py-2">
                        About
                    </Link>
                    <Link href="#contact" className="transition-all hover:text-orange-600 hover:scale-110 py-2">
                        Contact
                    </Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <LanguageSwitcher />
                    <Button
                        onClick={onPostJobClick}
                        className="hidden md:flex bg-orange-600 hover:bg-orange-700 px-6 py-2.5 transition-all hover:scale-105 hover:shadow-lg"
                    >
                        <FileEdit className="h-5 w-5 mr-2" />
                        <span className="text-base">{t('common.post_job')}</span>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <nav className="flex flex-col space-y-4 mt-8">
                                <Link href="/" className="text-lg transition-colors hover:text-orange-600">
                                    Home
                                </Link>
                                <Link href="#jobs" className="text-lg transition-colors hover:text-orange-600">
                                    Jobs
                                </Link>
                                <Link href="#about" className="text-lg transition-colors hover:text-orange-600">
                                    About
                                </Link>
                                <Link href="#contact" className="text-lg transition-colors hover:text-orange-600">
                                    Contact
                                </Link>
                                <Button
                                    onClick={onPostJobClick}
                                    className="w-full bg-orange-600 hover:bg-orange-700"
                                >
                                    <FileEdit className="h-4 w-4 mr-2" />
                                    {t('common.post_job')}
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
