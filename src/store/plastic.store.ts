import {create} from 'zustand';
import {PlasticCollection, MonthlyPlasticSummary} from '../types/plastic.types';

interface PlasticState {
  collections: PlasticCollection[];
  monthlySummary: MonthlyPlasticSummary | null;
  addCollection: (collection: PlasticCollection) => void;
  updateCollectionStatus: (id: string, status: PlasticCollection['status']) => void;
  setMonthlySummary: (summary: MonthlyPlasticSummary) => void;
}

export const usePlasticStore = create<PlasticState>(set => ({
  collections: [],
  monthlySummary: null,
  addCollection: (collection: PlasticCollection) =>
    set(state => ({collections: [collection, ...state.collections]})),
  updateCollectionStatus: (id: string, status: PlasticCollection['status']) =>
    set(state => ({
      collections: state.collections.map(c =>
        c.id === id
          ? {...c, status, submittedAt: new Date().toISOString()}
          : c,
      ),
    })),
  setMonthlySummary: (summary: MonthlyPlasticSummary) =>
    set({monthlySummary: summary}),
}));
