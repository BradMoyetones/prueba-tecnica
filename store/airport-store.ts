import { create } from 'zustand';
import type { Airport } from '@/types/airport';
import { searchAirportsApi } from '@/lib/api/airports';

interface AirportStore {
    airports: Airport[];
    isLoading: boolean;
    error: string | null;
    searchAirports: (query: string) => Promise<void>;
    getAirportById: (id: string) => Airport | undefined;
    clearError: () => void;
}

export const useAirportStore = create<AirportStore>((set, get) => ({
    airports: [],
    isLoading: false,
    error: null,

    searchAirports: async (query: string) => {
        set({ isLoading: true, error: null });

        try {
            const airports = await searchAirportsApi(query);
            set({ airports, isLoading: false });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Fallo al buscar aeropuertos';
            set({ error: errorMessage, isLoading: false, airports: [] });
        }
    },

    getAirportById: (id: string) => {
        const { airports } = get();
        return airports.find((airport) => airport.id === id);
    },

    clearError: () => set({ error: null }),
}));
