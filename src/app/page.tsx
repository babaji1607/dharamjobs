"use client";

import { useState, useMemo } from "react";
import JobListingsNew from "@/components/JobListingsNew";
import VerificationModal from "@/components/VerificationModal";
import JobPostModal from "@/components/JobPostModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobFilterSidebar, { JobFilters, DEFAULT_JOB_FILTERS } from "@/components/JobFilterSidebar";
import { Job, VerifiedUser, JobApplication } from "@/types";
import { dummyJobs } from "@/data/dummyJobs";
import { useLocale } from "@/contexts/LocaleContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Flower2 } from "lucide-react";

export default function Home() {
  const { t, locale } = useLocale();
  const { session } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<VerifiedUser | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({ ...DEFAULT_JOB_FILTERS });

  const availableCities = useMemo(() => {
    const uniqueCities = new Set<string>();
    jobs.forEach((job) => uniqueCities.add(job.city));
    return Array.from(uniqueCities).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const getTranslated = (content: string | Record<string, string>): string => {
    if (typeof content === "string") return content;
    return content[locale] || content["en"] || Object.values(content)[0] || "";
  };

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = getTranslated(job.title);
      const description = getTranslated(job.description);
      const lowerSearch = filters.searchTerm.toLowerCase();

      const matchesSearch =
        lowerSearch.length === 0 ||
        title.toLowerCase().includes(lowerSearch) ||
        job.company.toLowerCase().includes(lowerSearch) ||
        description.toLowerCase().includes(lowerSearch) ||
        job.city.toLowerCase().includes(lowerSearch) ||
        job.state.toLowerCase().includes(lowerSearch);

      // State filter
      if (filters.state !== "all" && job.state !== filters.state) {
        return false;
      }

      // City filter
      if (filters.city !== "all" && job.city !== filters.city) {
        return false;
      }

      // Job type filter
      if (filters.jobType !== "all" && job.jobType !== filters.jobType) {
        return false;
      }

      // Family enterprise filter
      if (filters.showFamilyOnly && !job.isFamilyEnterprise) {
        return false;
      }

      // Salary range filter
      const jobMinSalary = job.salary.min;
      const jobMaxSalary = job.salary.max;
      if (jobMaxSalary < filters.salaryMin || jobMinSalary > filters.salaryMax) {
        return false;
      }

      // Language filter
      if (filters.languages.length > 0 && !filters.languages.some((language) => job.languages.includes(language))) {
        return false;
      }

      return matchesSearch;
    });
  }, [jobs, filters, locale]);

  const handleVerification = (user: VerifiedUser) => {
    setVerifiedUser(user);
    setShowVerificationModal(false);
    setShowPostModal(true);
  };

  const handleJobSubmit = (jobData: Omit<Job, "id" | "postedDate">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      postedDate: new Date(),
      applications: [],
    };

    setJobs([newJob, ...jobs]);
    setShowPostModal(false);
    setVerifiedUser(null);

    // Scroll to top to see the new job
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobApply = (jobId: string, applicationData: Omit<JobApplication, "id" | "appliedDate">) => {
    const newApplication: JobApplication = {
      ...applicationData,
      id: Date.now().toString(),
      appliedDate: new Date(),
    };

    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          applications: [...(job.applications || []), newApplication],
        };
      }
      return job;
    }));
  };

  const handlePostJobClick = () => {
    // Check if user is authenticated
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    setShowVerificationModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar onPostJobClick={handlePostJobClick} />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden text-white animate-fade-in">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://varanasiallcab.com/wp-content/uploads/2025/09/Ganga-Aarti-Varanasi-From-Boat.jpg')" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.85),rgba(0,0,0,0.35))]" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 py-20 md:py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 flex flex-col items-center justify-center gap-4 animate-fade-in-up">
            <Flower2 className="h-14 w-14 md:h-16 md:w-16 text-orange-200" />
            {t('common.dharmic_jobs')}
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Connecting Hindu Community Through Dharmic Employment
          </p>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Supporting Family Enterprises & State-wise Job Opportunities Across India
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-background" aria-hidden />
      </section>

      {/* Main Content with Sidebar */}
      <main className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Sidebar - Hidden on mobile, shown on large screens */}
            <aside className="hidden lg:block animate-slide-in-left">
              <JobFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                jobCount={filteredJobs.length}
                availableCities={availableCities}
              />
            </aside>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              {/* Mobile Filter Button - Shows sheet with filters */}
              <div className="lg:hidden mb-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full h-12 text-base">
                      <Filter className="h-5 w-5 mr-2" />
                      Filters ({filteredJobs.length} jobs)
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full max-w-sm overflow-y-auto px-0">
                    <div className="mt-8">
                      <JobFilterSidebar
                        filters={filters}
                        onFilterChange={setFilters}
                        jobCount={filteredJobs.length}
                        availableCities={availableCities}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <JobListingsNew jobs={filteredJobs} onJobApply={handleJobApply} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />

      <VerificationModal
        open={showVerificationModal}
        onOpenChange={setShowVerificationModal}
        onVerified={handleVerification}
      />

      {verifiedUser && (
        <JobPostModal
          open={showPostModal}
          onOpenChange={setShowPostModal}
          onSubmit={handleJobSubmit}
          verifiedUser={verifiedUser}
        />
      )}
    </div>
  );
}
