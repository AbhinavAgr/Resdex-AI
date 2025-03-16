export interface Candidate {
  id: string;
  name: string;
  photoUrl: string;
  experience: number;
  currentCTC: string;
  currentLocation: string;
  currentEmployer: string;
  previousEmployer: string;
  education: string;
  preferredLocation: string;
  skills: string[];
  lastActive: string;
  phone: string;
  email: string;
  resume: string;
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}