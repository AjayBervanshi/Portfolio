import { PERSONAL_INFO } from './constants';

export const calculateExperience = (startDate: string = PERSONAL_INFO.CAREER_START_DATE): number => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  return diffYears;
};

export const formatExperience = (startDate: string = PERSONAL_INFO.CAREER_START_DATE): string => {
  const years = calculateExperience(startDate);
  return `${years}+ years`;
};

export const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30.44);
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365.25);
    const remainingMonths = Math.floor((diffDays % 365.25) / 30.44);
    
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }
};

export const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  if (!endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return `${startFormatted} - ${endFormatted}`;
};