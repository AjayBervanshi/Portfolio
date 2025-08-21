// Centralized experience calculation utility
// This ensures all experience calculations are consistent across the portfolio

export const CAREER_START_DATE = '2022-07-01';

export const calculateExperience = (startDate: string = CAREER_START_DATE): number => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  return diffYears;
};

export const formatExperience = (startDate: string = CAREER_START_DATE): string => {
  const years = calculateExperience(startDate);
  return `${years}+ years`;
};

// Predefined start dates for different skill areas
export const SKILL_START_DATES = {
  CORE_SKILLS: '2022-07-01',        // SQL Server, T-SQL, SSMS, Problem-Solving
  EARLY_SKILLS: '2022-08-01',       // PowerShell, SQL Profiler, Performance Monitor
  MID_SKILLS: '2022-09-01',         // Performance Tuning, Query Optimization, Monitoring
  ADVANCED_SKILLS: '2022-10-01',    // Clustering, Replication, Disaster Recovery
  SECURITY_SKILLS: '2022-11-01',    // Authentication, Security Policies, Encryption
  COMPLIANCE_SKILLS: '2022-12-01',  // GDPR, PCI DSS
  CLOUD_SKILLS: '2023-01-01',       // Azure SQL
} as const;
