import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchAirportsApi, searchAirportsCached } from '@/lib/api/airports';
import { AirportApiResponse, AirportStore, SearchMode } from '@/types';

export const useAirportStore = create<AirportStore>()(
    persist(
        (set, get) => ({
            data: null,
            allData: [],
            isLoading: false,
            error: null,

            // Paginación
            currentPage: 1,
            itemsPerPage: 10,

            // Por defecto busqueda cacheada para evitar errores API
            searchMode: "cached",
            setSearchMode: (mode: SearchMode) => set({ searchMode: mode }),

            // Nuevo estado añadido para la gestion de la query realizada
            searchQuery: "",
            setSearchQuery: (query: string) => set({ searchQuery: query }),

            // Historial de busquedas
            searchHistory: [],

            // Busqueda con query para obtener los datos paginados
            searchAirports: async (query: string) => {
                set({ isLoading: true, error: null, searchQuery: query, data: null, currentPage: 1 })

                try {
                    const { itemsPerPage, searchMode, allData, addToHistory } = get()

                    // Agregar query al historial cuando se realiza una búsqueda
                    addToHistory(query)

                    let response: AirportApiResponse

                    if (searchMode === "cached") {
                        response = searchAirportsCached(allData, query, 0, itemsPerPage)
                    } else {
                        response = await searchAirportsApi(query, 0, itemsPerPage)
                        set({
                            allData: [...allData, ...response.data.filter((a) => !allData.find((existing) => existing.id === a.id))],
                        })
                    }

                    set({ data: response, isLoading: false })
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Fallo al buscar aeropuertos';
                    set((state) => ({ error: errorMessage, isLoading: false, data: state.data }));
                }
            },

            // Ir a pagina con termino o query de busqueda, numero de pagina e items por pagina
            goToPage: async (page: number) => {
                const { searchQuery, itemsPerPage, searchMode, allData } = get()

                set({ isLoading: true, error: null, currentPage: page })

                try {
                    const offset = (page - 1) * itemsPerPage

                    let response: AirportApiResponse

                    if (searchMode === "cached") {
                        response = searchAirportsCached(allData, searchQuery, offset, itemsPerPage)
                    } else {
                        response = await searchAirportsApi(searchQuery, offset, itemsPerPage)
                        set({
                            allData: [...allData, ...response.data.filter((a) => !allData.find((existing) => existing.id === a.id))],
                        })
                    }

                    set({ data: response, isLoading: false })
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "Fallo al cargar aeropuertos"
                    set({ error: errorMessage, isLoading: false })
                }
            },

            // Encontrar aeropuerto cacheado con id
            getAirportById: (id: string) => {
                const { data, allData } = get()
                return data?.data.find((airport) => airport.id === id) || allData.find((airport) => airport.id === id)
            },

            clearError: () => set({ error: null }),

            reset: () => set({ data: null, isLoading: false, error: null, searchQuery: "", currentPage: 1 }),


            // Metodos para el historial de busquedas
            addToHistory: (term: string) => {
                const { searchHistory } = get()
                const trimmedTerm = term.trim()

                if (!trimmedTerm) return

                // Evitar duplicados y mantener máximo 10 búsquedas para no saturar el store
                const newHistory = [trimmedTerm, ...searchHistory.filter((item) => item !== trimmedTerm)].slice(0, 10)

                set({ searchHistory: newHistory })
            },

            removeFromHistory: (term: string) => {
                const { searchHistory } = get()
                set({ searchHistory: searchHistory.filter((item) => item !== term) })
            },

            clearHistory: () => set({ searchHistory: [] }),
        }),
        {
            name: 'aviationstack',
        }
    )
);
