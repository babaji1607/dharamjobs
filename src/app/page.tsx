"use client";

import { useState } from "react";
import JobListingsNew from "@/components/JobListingsNew";
import VerificationModal from "@/components/VerificationModal";
import JobPostModal from "@/components/JobPostModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Job, VerifiedUser, JobApplication } from "@/types";
import { dummyJobs } from "@/data/dummyJobs";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

export default function Home() {
  const { t } = useLocale();
  const [jobs, setJobs] = useState<Job[]>(dummyJobs);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState<VerifiedUser | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);

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
    setShowVerificationModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-linear-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <LanguageSwitcher />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              🕉️ {t('common.dharmic_jobs')}
            </h1>
            <p className="text-primary-foreground/90 text-lg">
              Connecting Hindu Community Through Dharmic Employment
            </p>
            <p className="text-primary-foreground/80 text-sm mt-2">
              Supporting Family Enterprises & State-wise Job Opportunities
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Job Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={handlePostJobClick}
            size="lg"
            className="text-lg px-8"
          >
            📝 {t('common.post_job')}
          </Button>
        </div>

        {/* Job Listings */}
        <JobListingsNew jobs={jobs} onJobApply={handleJobApply} />
      </main>

      {/* Footer */}
      <footer className="bg-primary/95 text-primary-foreground py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-foreground/90">
            A platform dedicated to connecting Hindu community members through dharmic employment opportunities
          </p>
          <p className="text-primary-foreground/80 text-sm mt-2">
            🙏 Serving the Dharmic Community
          </p>
        </div>
      </footer>

      {/* Modals */}
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
