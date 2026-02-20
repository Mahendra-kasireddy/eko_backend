import {PlasticCollection, MonthlyPlasticSummary} from '../types/plastic.types';

export const logPlasticCollection = async (
  tripId: string,
  weightKg: number,
  bagCount: number,
): Promise<PlasticCollection> => {
  await new Promise<void>(resolve => setTimeout(resolve, 800));
  return {
    id: `plastic_${Date.now()}`,
    tripId,
    weightKg,
    bagCount,
    collectedAt: new Date().toISOString(),
    storeId: 'store_001',
    status: 'collected',
    customerRedeemPoints: Math.round(weightKg * 50),
  };
};

export const submitPlasticToStore = async (
  collectionId: string,
  storeCode: string,
): Promise<{success: boolean; pointsAwarded: number}> => {
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  console.log('Plastic submitted:', collectionId, storeCode);
  return {success: true, pointsAwarded: 150};
};

export const fetchMonthlyPlasticSummary = async (): Promise<MonthlyPlasticSummary> => {
  await new Promise<void>(resolve => setTimeout(resolve, 600));
  return {
    month: 'February',
    year: 2026,
    totalKg: 18.4,
    totalBags: 47,
    submittedKg: 16.2,
    pendingKg: 2.2,
    incentiveEarned: 368,
    tier: 'silver',
    collections: [
      {
        id: 'p001',
        tripId: 'trip_001',
        weightKg: 1.2,
        bagCount: 3,
        collectedAt: '2026-02-18T10:30:00Z',
        submittedAt: '2026-02-18T11:00:00Z',
        storeId: 'store_001',
        status: 'submitted',
        customerRedeemPoints: 60,
      },
      {
        id: 'p002',
        tripId: 'trip_002',
        weightKg: 0.8,
        bagCount: 2,
        collectedAt: '2026-02-18T14:20:00Z',
        storeId: 'store_001',
        status: 'collected',
        customerRedeemPoints: 40,
      },
      {
        id: 'p003',
        tripId: 'trip_003',
        weightKg: 2.1,
        bagCount: 5,
        collectedAt: '2026-02-17T09:15:00Z',
        submittedAt: '2026-02-17T10:00:00Z',
        storeId: 'store_002',
        status: 'submitted',
        customerRedeemPoints: 105,
      },
    ],
  };
};
