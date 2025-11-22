import { Airport, AirportApiResponse } from "./airport";

export interface AirportStore {
    data: AirportApiResponse | null;
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    itemsPerPage: number;
    goToPage: (page: number) => Promise<void>;
    setSearchQuery: (query: string) => void;
    searchAirports: (query: string) => Promise<void>;
    getAirportById: (id: string) => Airport | undefined;
    clearError: () => void;
    reset: () => void
}