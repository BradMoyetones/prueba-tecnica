import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchAirportsApi } from '@/lib/api/airports';
import { AirportStore } from '@/types';

export const useAirportStore = create<AirportStore>()(
    persist(
        (set, get) => ({
            data: null,
            isLoading: false,
            error: null,

            // Paginación
            currentPage: 1,
            itemsPerPage: 10,

            // Nuevo estado añadido para la gestion de la query realizada
            searchQuery: "",
            setSearchQuery: (query: string) => set({ searchQuery: query }),

            // Busqueda con query para obtener los datos paginados
            searchAirports: async (query: string) => {
                set({ isLoading: true, error: null, searchQuery: query, data: null, currentPage: 1 })

                try {
                    const { itemsPerPage } = get()
                    const data = await searchAirportsApi(query, 0, itemsPerPage);
                    set((state) => ({ data: { ...state.data, ...data }, isLoading: false }));
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Fallo al buscar aeropuertos';
                    set((state) => ({ error: errorMessage, isLoading: false, data: state.data }));
                }
            },

            // Ir a pagina con termino o query de busqueda, numero de pagina e items por pagina
            goToPage: async (page: number) => {
                const { searchQuery, itemsPerPage } = get()

                set({ isLoading: true, error: null, currentPage: page })

                try {
                    const offset = (page - 1) * itemsPerPage
                    const response = await searchAirportsApi(searchQuery, offset, itemsPerPage)
                    set({ data: response, isLoading: false })
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Fallo al cargar aeropuertos"
                    set({ error: errorMessage, isLoading: false })
                }
            },

            // Encontrar aeropuerto cacheado con id
            getAirportById: (id: string) => {
                const { data } = get();
                return data?.data.find((airport) => airport.id === id);
            },

            clearError: () => set({ error: null }),

            reset: () => set({ data: null, isLoading: false, error: null, searchQuery: "", currentPage: 1 }),
        }),
        {
            name: 'aviationstack',
        }
    )
);
