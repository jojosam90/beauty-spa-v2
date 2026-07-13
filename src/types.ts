export type Language = "en" | "zh";

export interface TreatmentStep {
  title: string;
  description: string;
}

export interface Treatment {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  tag?: string;
  steps: TreatmentStep[];
  benefits: string[];
}

export interface Reason {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface SanctuaryCommitment {
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  date: string;
}
