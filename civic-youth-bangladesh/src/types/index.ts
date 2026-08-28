export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  isExternal?: boolean;
}

export interface ThematicArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: "red" | "green";
  href: string;
  secondaryImage?: string;
}

export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  image?: string;
  badge?: string;
  href: string;
  featured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  href: string;
  author?: string;
  readTime?: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string | number;
  suffix?: string;
  prefix?: string;
  type: "target" | "actual" | "coming-soon";
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  placeholder?: boolean;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  placeholder?: boolean;
  socialLinks?: SocialLink[];
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface NewsletterFormData {
  email: string;
}