import { render, screen, fireEvent } from '@testing-library/react';
import { useAirportStore } from '@/store/airport-store';
import { SearchInterface } from '@/components/search-interface';

// Mock del Store (Zustand)
jest.mock('@/store/airport-store');

// Mock de la librería de animación general en este caso framer motion
jest.mock('motion/react', () => ({
    motion: {
        div: ({ children, className, onClick }: any) => (
            <div className={className} onClick={onClick}>
                {children}
            </div>
        ),
        header: ({ children, className }: any) => <header className={className}>{children}</header>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useInView: jest.fn(() => true),
}));

// Mock para MotionEffect
jest.mock('@/components/animate/motion-effect', () => ({
    MotionEffect: ({ children }: any) => <div>{children}</div>,
}));

// Mock SearchBar
jest.mock('@/components/search-bar', () => ({
    SearchBar: ({ onSearch }: any) => (
        <button data-testid="search-btn" onClick={() => onSearch('test')}>
            Buscar
        </button>
    ),
}));

// Mock AirportCard
jest.mock('@/components/airport-card', () => ({
    AirportCard: ({ airport }: any) => <div>{airport.airport_name}</div>,
}));

// Mock del componente de paginación de shadcn
jest.mock('@/components/ui/pagination', () => ({
    Pagination: ({ children }: any) => <nav>{children}</nav>,
    PaginationContent: ({ children }: any) => <ul>{children}</ul>,
    PaginationItem: ({ children }: any) => <li>{children}</li>,
    PaginationLink: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    PaginationNext: ({ onClick }: any) => <button onClick={onClick}>Next</button>,
    PaginationPrevious: ({ onClick }: any) => <button onClick={onClick}>Prev</button>,
    PaginationEllipsis: () => <span>...</span>,
}));

// Mock de Toggles
jest.mock('@/components/mode-toggle', () => ({
    ModeToggle: () => <div data-testid="mode-toggle" />,
}));
jest.mock('@/components/search-mode-toggle', () => ({
    SearchModeToggle: () => <div data-testid="search-mode-toggle" />,
}));

// Mock de window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });

// Pruebas
describe('SearchInterface Component', () => {
    const mockGoToPage = jest.fn();
    const mockSetSearchMode = jest.fn();

    // Resetear mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
        (useAirportStore as unknown as jest.Mock).mockReturnValue({
            data: null,
            allData: [],
            isLoading: false,
            error: null,
            currentPage: 1,
            itemsPerPage: 10,
            goToPage: mockGoToPage,
            searchMode: 'cached',
            setSearchMode: mockSetSearchMode,
        });
    });

    test('Debe renderizar la vista inicial correctamente', () => {
        render(<SearchInterface />);
        expect(screen.getByText('SkyConnect Explorer')).toBeInTheDocument();
        expect(screen.getByTestId('search-btn')).toBeInTheDocument();
    });

    test('Debe cambiar a la vista de resultados al realizar una búsqueda', () => {
        render(<SearchInterface />);
        
        // Al hacer clic, cambia el estado 'hasSearched' a true
        fireEvent.click(screen.getByTestId('search-btn'));

        // Verificamos que el título sigue ahí (ahora en el header sticky)
        expect(screen.getByText('SkyConnect Explorer')).toBeInTheDocument();
    });

    test('Debe mostrar el indicador de carga (Loader)', () => {
        (useAirportStore as unknown as jest.Mock).mockReturnValue({
            isLoading: true,
            error: null,
            data: null,
        });

        render(<SearchInterface />);
        fireEvent.click(screen.getByTestId('search-btn')); // Forzar vista de resultados

        expect(screen.getByText('Buscando aeropuertos...')).toBeInTheDocument();
    });

    test('Debe mostrar un mensaje de error si el store devuelve error', () => {
        const errorMessage = 'Fallo al buscar aeropuertos';
        (useAirportStore as unknown as jest.Mock).mockReturnValue({
            isLoading: false,
            error: errorMessage,
            data: null,
        });

        render(<SearchInterface />);
        fireEvent.click(screen.getByTestId('search-btn'));

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    test('Debe mostrar mensaje cuando no se encuentran resultados', () => {
        (useAirportStore as unknown as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            data: { data: [], pagination: { total: 0 } },
        });

        render(<SearchInterface />);
        fireEvent.click(screen.getByTestId('search-btn'));

        expect(screen.getByText(/No se encontraron aeropuertos/i)).toBeInTheDocument();
    });

    test('Debe renderizar lista de aeropuertos y paginación cuando hay datos', () => {
        const mockData = {
            pagination: { total: 20, offset: 0 },
            data: [
                { id: "5586279", airport_name: 'Aeropuerto El Dorado' },
                { id: "5586280", airport_name: 'Aeropuerto Jose Maria' },
            ],
        };

        (useAirportStore as unknown as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            data: mockData,
            currentPage: 1,
            itemsPerPage: 10,
            goToPage: mockGoToPage,
        });

        render(<SearchInterface />);
        fireEvent.click(screen.getByTestId('search-btn'));

        expect(screen.getByText('Aeropuerto El Dorado')).toBeInTheDocument();
        expect(screen.getByText(/Mostrando 1 - 2 de 20/i)).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    test('Debe llamar a goToPage y hacer scroll al cambiar de página', () => {
        const mockData = {
            pagination: { total: 50, offset: 0 },
            data: [{ id: "5586279", airport_name: 'Test en paginación y devuelve a top con scroll' }],
        };

        (useAirportStore as unknown as jest.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            data: mockData,
            currentPage: 1,
            itemsPerPage: 10,
            goToPage: mockGoToPage,
        });

        render(<SearchInterface />);
        fireEvent.click(screen.getByTestId('search-btn'));

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        expect(mockGoToPage).toHaveBeenCalledWith(2);
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});