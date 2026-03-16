export type Project = {
  id: string;
  name: string;
  description: string;
  link: string | null;
  github: string | null;
  image: string;
  tags: string[];
  order_index: number;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  initials: string;
  bullets: string[];
  order_index: number;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
  order_index: number;
};

export type Tool = {
  id: string;
  name: string;
  icon: string;
  order_index: number;
};

export type AboutContent = {
  id: number;
  paragraph1: string;
  paragraph2: string;
};

export type SiteVisit = {
  id: string;
  visited_at: string;
  page: string;
  country: string | null;
  country_code: string | null;
  city: string | null;
  region: string | null;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
};
