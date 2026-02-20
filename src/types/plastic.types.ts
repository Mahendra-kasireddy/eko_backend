import {PlasticCollection} from './trip.types';

export type {PlasticCollection};

export interface PlasticSubmission {
  tripId: string;
  storeId: string;
  weightKg: number;
  bagCount: number;
  storeCode: string;
}

export interface MonthlyPlasticSummary {
  month: string;
  year: number;
  totalKg: number;
  totalBags: number;
  submittedKg: number;
  pendingKg: number;
  collections: PlasticCollection[];
  incentiveEarned: number;
  tier: 'bronze' | 'silver' | 'gold';
}
