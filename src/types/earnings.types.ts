import {RiderTier} from './rider.types';

export interface WeeklyEarning {
  week: string;
  amount: number;
}

export interface PayoutRecord {
  id: string;
  month: string;
  amount: number;
  paidAt: string;
  status: 'paid' | 'pending' | 'processing';
}

export interface MonthlyEarnings {
  month: string;
  year: number;
  baseSalary: number;
  plasticBonus: number;
  rideEarnings: number;
  total: number;
  plasticKgCollected: number;
  tier: RiderTier;
  weeklyBreakdown: WeeklyEarning[];
  payoutHistory: PayoutRecord[];
}
