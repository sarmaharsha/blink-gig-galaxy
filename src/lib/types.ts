
export interface User {
  id: string;
  username: string;
  avatar: string;
  rating: number;
  completedGigs: number;
  wallet: string;
  dateJoined: string;
  bio: string;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  timeEstimate: string;
  poster: User;
  datePosted: string;
  skills: string[];
  status: 'open' | 'in-progress' | 'completed';
  image?: string;
}

export type Category = 
  | 'design'
  | 'writing'
  | 'translation'
  | 'programming'
  | 'video'
  | 'audio'
  | 'marketing'
  | 'business'
  | 'other';

export interface Payment {
  id: string;
  amount: number;
  currency: 'SOL' | 'USDC';
  sender: string;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  gigId: string;
}
