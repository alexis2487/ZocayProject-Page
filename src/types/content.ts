export interface Article {
  id?: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content?: string;
  image?: string;
  status?: 'published' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  priceCOP: string;
  description: string;
  impact: string;
  image: string;
  inStock?: boolean;
}

export interface ResearchLine {
  code: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface DonationTier {
  amount: number;
  label: string;
  usd: string;
  impact: string;
}

export interface DirectorProfile {
  name: string;
  title: string;
  role: string;
  photo: string;
  socials: {
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  doctorate: string;
  doctorateAffiliation: string;
  graduate: string;
  undergraduate: string;
  bio: string;
}
