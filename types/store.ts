import { Airport, AirportApiResponse, SearchMode } from "@/types";

export interface AirportStore {
    data: AirportApiResponse | null;
    allData: Airport[]
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    currentPage: number;
    itemsPerPage: number;
    searchMode: SearchMode;
    goToPage: (page: number) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setSearchMode: (mode: SearchMode) => void
    searchAirports: (query: string) => Promise<void>;
    getAirportById: (id: string) => Airport | undefined;
    clearError: () => void;
    reset: () => void
}