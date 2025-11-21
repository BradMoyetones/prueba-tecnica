import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Airport, AirportApiResponse } from '@/types/airport';
import { searchAirportsApi } from '@/lib/api/airports';

interface AirportStore {
    data: AirportApiResponse | null;
    isLoading: boolean;
    error: string | null;
    searchAirports: (query: string) => Promise<void>;
    getAirportById: (id: string) => Airport | undefined;
    clearError: () => void;
}

export const useAirportStore = create<AirportStore>()(
    persist(
        (set, get) => ({
            data: null,
            isLoading: false,
            error: null,

            searchAirports: async (query: string) => {
                set((state) => ({ ...state, isLoading: true, error: null }));

                try {
                    const data = await searchAirportsApi(query);
                    set((state) => ({ data: { ...state.data, ...data }, isLoading: false }));
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Fallo al buscar aeropuertos';
                    set((state) => ({ error: errorMessage, isLoading: false, data: state.data }));
                }
            },

            getAirportById: (id: string) => {
                const { data } = get();
                return data?.data.find((airport) => airport.id === id);
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'aviationstack',
        }
    )
);
