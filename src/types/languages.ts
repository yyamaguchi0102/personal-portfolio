export interface LanguageContent {
  header: {
    home: string;
    skills: string;
    projects: string;
    services: string;
    contact: string;
    resume: string;
  };
home: { 
    name: string;
    typewriter: string[];
    intro: string;
    staticPhrase: string;
    buttons: {
      linkedin: string;
      github: string;
      aboutMe: string;
    };
    about: {
      title: string;
      content: string;
      close: string;
    };
  };
  skills: {
    title: string;
    description: string;
    languages: {
      english: string;
      japanese: string;
      korean: string;
    };
    proficiency: {
      native: string;
      fluent: string;
    };
    sections: {
      spokenLanguages: string;
      programmingStack: string;
    };
    domains: {
      frontend: {
        title: string;
        description: string;
        achievements: string[];
      };
      backend: {
        title: string;
        description: string;
        achievements: string[];
      };
      devops: {
        title: string;
        description: string;
        achievements: string[];
      };
      ai: {
        title: string;
        description: string;
        achievements: string[];
      };
      databases: {
        title: string;
        description: string;
        achievements: string[];
      };
      other: {
        title: string;
        description: string;
        achievements: string[];
      };
    };
  };
  projects: {
    title: string;
    description: string;
    technologiesUsed: string;
    demo: string;
    repo: string;
    demoComingSoon: string;
    repoComingSoon: string;
    items: Array<{
      name: string;
      description: string;
      demo: string;
      repo: string;
      tech: string[];
      demoUrl: string;
      repoUrl: string;
      categories?: string[];
      type?: string;
      image?: string;
      category: 'ml' | 'app' | 'both';
    }>;
  };
  services: {
    title: string;
    description: string;
    learnMore: string;
    whatIncluded: string;
    pricing: string;
    availability: string;
    getStarted: string;
    contactButton: string;
    details: {
      tutoring: {
        point1: string;
        point2: string;
        point3: string;
        pricing: string;
        availability: string;
      };
      translation: {
        point1: string;
        point2: string;
        point3: string;
        pricing: string;
        availability: string;
      };
      trumpet: {
        point1: string;
        point2: string;
        point3: string;
        pricing: string;
        availability: string;
      };
    };
    items: Array<{
      name: string;
      description: string;
    }>;
  };
  contact: {
    title: string;
    description: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
  };
  loadingScreen: {
    languagePrompt: string;
    moodPrompt: string;
    moodBright: string;
    moodDark: string;
    back: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    resume: string;
    rights: string;
    designed: string;
  };
}

export interface Languages {
  en: LanguageContent;
  jp: LanguageContent;
  ko: LanguageContent;
}

export type LanguageKey = 'en' | 'jp' | 'ko';

export type SkillDomain = {
  frontend: {
    title: string;
    description: string;
    achievements: string[];
  };
  backend: {
    title: string;
    description: string;
    achievements: string[];
  };
  devops: {
    title: string;
    description: string;
    achievements: string[];
  };
  ai: {
    title: string;
    description: string;
    achievements: string[];
  };
  databases: {
    title: string;
    description: string;
    achievements: string[];
  };
  other: {
    title: string;
    description: string;
    achievements: string[];
  };
}; 