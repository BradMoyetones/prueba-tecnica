'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { SearchBar } from './search-bar';
import { AirportCard } from './airport-card';
import { useAirportStore } from '@/store/airport-store';
import { Loader2 } from 'lucide-react';
import { MotionEffect } from './animate/motion-effect';

// Componentes de paginación shadcn
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';
import { ModeToggle } from './mode-toggle';

import { SearchModeToggle } from './search-mode-toggle';

export function SearchInterface() {
    const [hasSearched, setHasSearched] = useState(false);

    const { data, isLoading, error, currentPage, itemsPerPage, goToPage, searchMode, setSearchMode } =
        useAirportStore();

    const handleSearch = () => {
        setHasSearched(true);
    };

    const totalPages = data?.pagination ? Math.ceil(data.pagination.total / itemsPerPage) : 0;

    // Cambiar de página y subir con scroll suave
    const handlePageChange = (page: number) => {
        goToPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Entrega el numero de páginas con un maximo de 5 botones, si hay mas entrega ellipsis (...) para no afectar la vista en responsive
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('ellipsis');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="relative min-h-screen w-full z-10">
            {/* Presencia de animación indicando que depende de -> !hasSearched -> se utiliza layoutId de motion para la transición suave */}
            {!hasSearched ? (
                <div className="flex flex-col items-center justify-center min-h-screen px-4">
                    <div className="flex flex-col items-center gap-4 max-w-2xl w-full">
                        {/* MotionEffect personalizado para las animaciones de entrada */}
                        <MotionEffect
                            layoutId="title" // ID que sirve para realizar el movimiento al comenzar una busqueda
                            slide={{
                                direction: 'down',
                            }}
                            fade
                            zoom
                            inView
                            delay={0.5}
                        >
                            <div className="flex items-center gap-3">
                                <h1 className="text-5xl md:text-6xl py-1.5 font-bold text-balance text-center bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent">
                                    SkyConnect Explorer
                                </h1>
                            </div>
                        </MotionEffect>
                        <MotionEffect
                            layoutId="search"
                            slide={{
                                direction: 'down',
                            }}
                            fade
                            zoom
                            inView
                            delay={0.6}
                        >
                            <SearchBar onSearch={handleSearch} />
                        </MotionEffect>
                    </div>
                </div>
            ) : (
                <div key="searched" className="min-h-screen">
                    <motion.header className="sticky top-0 z-50 bg-background/30 backdrop-blur-2xl">
                        <div className="container mx-auto px-4 py-2">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <motion.div layoutId="title" className="flex items-center justify-between gap-2">
                                    <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                                        SkyConnect Explorer
                                    </h1>

                                    {/* Modo de busqueda en dispositivos móbiles */}
                                    <div className="flex md:hidden">
                                        <SearchModeToggle mode={searchMode} onModeChange={setSearchMode} />
                                    </div>
                                </motion.div>
                                <motion.div layoutId="search" className="flex-1 md:max-w-xl flex items-center gap-4">
                                    {/* Modo de busqueda */}
                                    <div className="hidden md:flex">
                                        <SearchModeToggle mode={searchMode} onModeChange={setSearchMode} />
                                    </div>

                                    <SearchBar onSearch={handleSearch} compact />
                                    {/* Modo toggle extra, utiliza dropdown de shadcn y useTheme de next-themes */}
                                    <ModeToggle />
                                </motion.div>
                            </div>
                        </div>
                    </motion.header>

                    <div className="container mx-auto px-4 py-8">
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 gap-4"
                            >
                                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                                <p className="text-muted-foreground">{'Buscando aeropuertos...'}</p>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-20"
                            >
                                <p className="text-destructive text-lg">{error}</p>
                            </motion.div>
                        )}

                        {!isLoading && !error && data?.data.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-20"
                            >
                                <p className="text-muted-foreground text-lg">
                                    {'No se encontraron aeropuertos. Intente con otro término de búsqueda.'}
                                </p>
                            </motion.div>
                        )}

                        {data && !isLoading && data.data.length > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-muted-foreground">
                                        Mostrando {data.pagination.offset + 1} -{' '}
                                        {data.pagination.offset + data.data.length} de {data.pagination.total}{' '}
                                        aeropuertos.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Página {currentPage} de {totalPages}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Muestreo de items encontrados */}
                                    {data.data.map((airport, index) => (
                                        <AirportCard key={airport.id} airport={airport} index={index} />
                                    ))}
                                </div>

                                {/* Paginación con el componente shadcn, el componente no viene con lógica así que se creó la función -> getPageNumbers */}
                                {totalPages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-center mt-12"
                                    >
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() =>
                                                            currentPage > 1 && handlePageChange(currentPage - 1)
                                                        }
                                                        className={
                                                            currentPage === 1
                                                                ? 'pointer-events-none opacity-50'
                                                                : 'cursor-pointer'
                                                        }
                                                    />
                                                </PaginationItem>

                                                {getPageNumbers().map((page, index) =>
                                                    page === 'ellipsis' ? (
                                                        <PaginationItem key={`ellipsis-${index}`}>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    ) : (
                                                        <PaginationItem key={`page-${page}`}>
                                                            <PaginationLink
                                                                onClick={() => handlePageChange(page as number)}
                                                                isActive={currentPage === page}
                                                                className="cursor-pointer"
                                                            >
                                                                {page}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )
                                                )}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() =>
                                                            currentPage < totalPages &&
                                                            handlePageChange(currentPage + 1)
                                                        }
                                                        className={
                                                            currentPage === totalPages
                                                                ? 'pointer-events-none opacity-50'
                                                                : 'cursor-pointer'
                                                        }
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
