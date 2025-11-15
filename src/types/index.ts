import { Locale } from '@/contexts/LocaleContext';

export interface Job {
  id: string;
  title: string | Record<Locale, string>; // Support both old and new format
  company: string;
  description: string | Record<Locale, string>; // Support both old and new format
  state: string;
  city: string;
  jobType: JobType;
  salary: SalaryRange;
  languages: Language[];
  isFamilyEnterprise: boolean;
  contactEmail: string;
  contactPhone: string;
  postedDate: Date;
  postedBy: VerifiedUser;
  applications?: JobApplication[];
}

export type JobType = "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";

export type Language = "Hindi" | "Tamil" | "Telugu" | "Kannada" | "Marathi" | "Gujarati" | "Bengali" | "Odia" | "English";

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: "monthly" | "yearly";
}

export interface VerifiedUser {
  name: string;
  email: string;
  phone: string;
  verifiedDate: Date;
}

export interface JobApplication {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  message: string;
  appliedDate: Date;
}

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianState = typeof INDIAN_STATES[number];

export const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

export const LANGUAGES: Language[] = [
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Odia",
  "English",
];
