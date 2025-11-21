'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './search-bar';
import { AirportCard } from './airport-card';
import { useAirportStore } from '@/store/airport-store';
import { Loader2 } from 'lucide-react';
import { MotionEffect } from './animate/motion-effect';

export function SearchInterface() {
    const [hasSearched, setHasSearched] = useState(false);
    
    const { data, isLoading, error } = useAirportStore();

    const handleSearch = () => {
        setHasSearched(true);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden z-10">
            <AnimatePresence mode="wait">
                {!hasSearched ? (
                    <div
                        className="flex flex-col items-center justify-center min-h-screen px-4"
                    >
                        <div
                            className="flex flex-col items-center gap-4 max-w-2xl w-full"
                        >
                            <MotionEffect
                                layoutId='title'
                                slide={{
                                    direction: 'down',
                                }}
                                fade
                                zoom
                                inView
                                delay={0.05}
                            >
                                <div className="flex items-center gap-3">
                                    <h1 className="text-5xl md:text-6xl py-1.5 font-bold text-balance text-center bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent">
                                        SkyConnect Explorer
                                    </h1>
                                </div>
                            </MotionEffect>
                            <MotionEffect
                                layoutId='search'
                                slide={{
                                    direction: 'down',
                                }}
                                fade
                                zoom
                                inView
                                delay={0.15}
                            >
                                <SearchBar onSearch={handleSearch} />
                            </MotionEffect>
                        </div>
                    </div>
                ) : (
                    <div
                        key="searched"
                        className="min-h-screen"
                    >
                        <motion.header
                            className="sticky top-0 z-50 glassmorphism"
                        >
                            <div className="container mx-auto px-4 py-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <motion.div layoutId="title" className="flex items-center gap-2">
                                        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
                                            SkyConnect Explorer
                                        </h1>
                                    </motion.div>
                                    <motion.div layoutId="search" className="flex-1 md:max-w-xl">
                                        <SearchBar onSearch={handleSearch} compact />
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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="text-muted-foreground mb-6">
                                        {data.data.length} aeropuertos encontrados
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {data.data.map((airport, index) => (
                                            <AirportCard key={airport.id} airport={airport} index={index} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
