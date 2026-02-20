import {MonthlyEarnings} from '../types/earnings.types';

export const fetchMonthlyEarnings = async (): Promise<MonthlyEarnings> => {
  await new Promise<void>(resolve => setTimeout(resolve, 700));
  return {
    month: 'February',
    year: 2026,
    baseSalary: 15000,
    plasticBonus: 368,
    rideEarnings: 4250,
    total: 19618,
    plasticKgCollected: 18.4,
    tier: 'silver',
    weeklyBreakdown: [
      {week: 'W1', amount: 4800},
      {week: 'W2', amount: 5200},
      {week: 'W3', amount: 4900},
      {week: 'W4', amount: 4718},
    ],
    payoutHistory: [
      {id: 'pay_001', month: 'January 2026', amount: 18500, paidAt: '2026-02-01', status: 'paid'},
      {id: 'pay_002', month: 'December 2025', amount: 17200, paidAt: '2026-01-01', status: 'paid'},
      {id: 'pay_003', month: 'November 2025', amount: 16800, paidAt: '2025-12-01', status: 'paid'},
    ],
  };
};
