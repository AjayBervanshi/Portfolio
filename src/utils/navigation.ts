import { PERSONAL_INFO } from './constants';

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const openLinkedIn = () => {
  window.open(PERSONAL_INFO.LINKEDIN_URL, '_blank');
};

export const scrollToContact = () => {
  scrollToSection('contact');
};

export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/resume-ajay-bervanshi.pdf';
  link.download = 'Ajay_Bervanshi_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => {
    console.log("Resume download initiated. Please ensure resume-ajay-bervanshi.pdf is in the public folder.");
  }, 100);
};