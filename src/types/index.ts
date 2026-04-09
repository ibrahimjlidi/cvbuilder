// Using Prisma-generated types where possible
export type { User, CVs as CV, JobApplication, Interview, InterviewQuestion } from '@prisma/client';

export interface DashboardStats {
  totalApplications: number;
  appliedCount: number;
  interviewCount: number;
  offerCount: number;
  rejectionCount: number;
  successRate: string;
  recentApplications: any[];
  upcomingInterviews: any[];
}
