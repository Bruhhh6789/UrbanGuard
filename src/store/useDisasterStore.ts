import { create } from 'zustand';
import { Coordinates, InfrastructureReport } from '../types/disaster';

interface DisasterState {
  currentLocation: Coordinates | null;
  reports: InfrastructureReport[];
  setCurrentLocation: (location: Coordinates) => void;
  addReport: (report: InfrastructureReport) => void;
}

export const useDisasterStore = create<DisasterState>((set) => ({
  currentLocation: null,
  reports: [
    {
      id: '1',
      title: 'Jalan Berlubang Besar',
      description: 'Bahaya bagi pengendara motor di tikungan.',
      location: { latitude: -6.200000, longitude: 106.816666 },
      category: 'jalan_rusak',
      timestamp: Date.now(),
    }
  ],
  setCurrentLocation: (location) => set({ currentLocation: location }),
  addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
}));