export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface ContentType {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface Language {
  id: string;
  label: string;
  flag: string;
  culturalNote: string;
}

export interface InquiryCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export interface BrandInfo {
  name: string;
  description: string;
  specialty: string;
}

export interface GenerateRequest {
  category: string;
  contentType: string;
  languages: string[];
  brand: BrandInfo;
  tone?: ToneType;
}

export interface InquiryRequest {
  category: string;
  customMessage: string;
  targetLanguages: string[];
  tone?: ToneType;
}

export type WizardStep = 1 | 2 | 3 | 4;

export type ToneType = "professional" | "casual" | "luxury" | "friendly";

export interface HistoryEntry {
  id: string;
  timestamp: number;
  type: "generate" | "inquiry";
  category: string;
  contentType?: string;
  languages: string[];
  tone: ToneType;
  brandName?: string;
  resultPreview: string;
  fullResult: string;
}

export interface QuickTemplate {
  id: string;
  label: string;
  description: string;
  category: string;
  contentType: string;
  languages: string[];
  brand: BrandInfo;
  tone: ToneType;
}

export interface InquiryTemplate {
  id: string;
  label: string;
  description: string;
  category: string;
  customMessage: string;
  targetLanguages: string[];
  tone: ToneType;
}
