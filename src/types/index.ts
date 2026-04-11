export interface Thread {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  period_start: number;
  period_end: number;
  theme: string;
  difficulty: 'general' | 'student' | 'researcher';
  nodes: ThreadNode[];
}

export interface ThreadNode {
  id: string;
  sequence_order: number;
  node_type: 'event' | 'policy' | 'person' | 'place' | 'outcome';
  title: string;
  body: string;
  year: number;
  year_label: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  birth_year: number;
  death_year?: number;
  role: string;
  summary: string;
  image_url: string;
  era: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  state: string;
  city: string;
  lat: number;
  lng: number;
  significance: string;
  period: string;
}

export interface HistoricalEvent {
  id: string;
  slug: string;
  title: string;
  year: number;
  date_label: string;
  summary: string;
  theme: string;
  significance_level: number;
}

export interface Policy {
  id: string;
  slug: string;
  title: string;
  year: number;
  policy_type: 'law' | 'executive_order' | 'court_decision' | 'regulation';
  summary: string;
  effect: string;
}

export interface Source {
  id: string;
  title: string;
  author: string;
  year: number;
  source_type: 'book' | 'archive' | 'documentary' | 'article' | 'report';
  url: string;
  description: string;
}

export interface ModernOutcome {
  id: string;
  slug: string;
  title: string;
  summary: string;
  data_point: string;
  source_citation: string;
  category: string;
  thread_id?: string;
}

export interface DiscoveryCard {
  question: string;
  slug: string;
  theme: string;
  era: string;
  node_count: number;
}

export type Theme = 'light' | 'dark';
