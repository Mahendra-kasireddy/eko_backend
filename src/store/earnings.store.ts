import {create} from 'zustand';
import {MonthlyEarnings} from '../types/earnings.types';

interface EarningsState {
  monthlyEarnings: MonthlyEarnings | null;
  setMonthlyEarnings: (earnings: MonthlyEarnings) => void;
}

export const useEarningsStore = create<EarningsState>(set => ({
  monthlyEarnings: null,
  setMonthlyEarnings: (earnings: MonthlyEarnings) =>
    set({monthlyEarnings: earnings}),
}));
