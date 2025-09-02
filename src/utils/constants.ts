// Centralized constants for the entire application
export const PERSONAL_INFO = {
  NAME: 'Ajay Bervanshi',
  TITLE: 'MS SQL Server Database Administrator',
  EMAIL: 'ajay.bervanshi@gmail.com',
  PHONE: '+91 7620 085260',
  LINKEDIN_URL: 'https://www.linkedin.com/in/ajay-bervanshi',
  LOCATION: 'Nagpur, Maharashtra, India',
  CAREER_START_DATE: '2022-07-01',
} as const;

export const RESUME_FILE = {
  URL: '/resume-ajay-bervanshi.pdf',
  DOWNLOAD_NAME: 'Ajay_Bervanshi_Resume.pdf',
} as const;

export const SKILL_LEVELS = {
  EXPERT: 'Expert',
  ADVANCED: 'Advanced', 
  INTERMEDIATE: 'Intermediate',
  BEGINNER: 'Beginner',
} as const;

export const SKILL_START_DATES = {
  CORE_SKILLS: '2022-07-01',
  EARLY_SKILLS: '2022-08-01',
  MID_SKILLS: '2022-09-01',
  ADVANCED_SKILLS: '2022-10-01',
  SECURITY_SKILLS: '2022-11-01',
  CLOUD_SKILLS: '2023-01-01',
} as const;