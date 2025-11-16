"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { Flower2, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
    const { t } = useLocale();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-muted/40 animate-fade-in">
            <div className="mx-auto w-full max-w-7xl py-20 px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    {/* About Section */}
                    <div className="space-y-5">
                        <div className="flex items-center space-x-3 group">
                            <Flower2 className="h-8 w-8 text-orange-600 transition-transform group-hover:rotate-12" />
                            <h3 className="font-bold text-xl">{t('common.dharmic_jobs')}</h3>
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Connecting Hindu community members through dharmic employment opportunities across India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-5">
                        <h4 className="font-semibold text-lg">Quick Links</h4>
                        <ul className="space-y-3.5 text-base">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#jobs" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="#post" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    Post a Job
                                </Link>
                            </li>
                            <li>
                                <Link href="#about" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-5">
                        <h4 className="font-semibold text-lg">Resources</h4>
                        <ul className="space-y-3.5 text-base">
                            <li>
                                <Link href="#faq" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#guidelines" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="#privacy" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#terms" className="text-muted-foreground hover:text-orange-600 transition-all hover:translate-x-1 inline-block">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-5">
                        <h4 className="font-semibold text-lg">Contact</h4>
                        <ul className="space-y-3.5 text-base text-muted-foreground">
                            <li className="flex items-center space-x-3 hover:text-orange-600 transition-colors">
                                <Mail className="h-5 w-5" />
                                <a href="mailto:info@dharmicjobs.com" className="hover:text-orange-600 transition-colors">
                                    info@dharmicjobs.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5" />
                                <span>+91 XXX XXX XXXX</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5" />
                                <span>India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-10 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-6">
                        <p className="text-base text-muted-foreground">
                            © {currentYear} DharmicJobs. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-3 text-base text-muted-foreground group">
                            <Heart className="h-5 w-5 text-orange-600 transition-transform group-hover:scale-110" />
                            <span>Serving the Dharmic Community</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
