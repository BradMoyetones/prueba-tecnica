'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAirportStore } from '@/store/airport-store';
import { cn } from '@/lib/utils';
import { AnimateIcon } from './animate-ui/icons/icon';
import { Search } from './animate-ui/icons/search';
import { useEffect, useRef, useState } from 'react';
import { History, X } from 'lucide-react';

interface SearchBarProps {
    onSearch?: () => void;
    compact?: boolean;
}

export function SearchBar({ onSearch, compact = false }: SearchBarProps) {
    const { searchQuery, setSearchQuery, isLoading, searchAirports, searchHistory, removeFromHistory } = useAirportStore()

    const [isFocused, setIsFocused] = useState(false)
    const searchBarRef = useRef<HTMLDivElement>(null) // Ref para el div que encierra el input de busqueda

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsFocused(false)
            }
        }

        // Listener para cuando se cliquee fuera del Historial al estar desplegado
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    
    // Subit y prevencion de envio por defecto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await searchAirports(searchQuery);
        setIsFocused(false)
        onSearch?.();
    };
    
    // Realizar busqueda al clicar termino del historial
    const handleHistoryClick = async (term: string) => {
        setSearchQuery(term)
        await searchAirports(term)
        setIsFocused(false)
        onSearch?.()
    }

    // Remover busqueda del historial
    const handleRemoveHistory = (e: React.MouseEvent, term: string) => {
        e.stopPropagation()
        removeFromHistory(term)
    }

    const showHistory = isFocused && searchHistory.length > 0


    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={cn('flex gap-3', compact ? 'flex-row' : 'flex-col sm:flex-row')}>
                <div ref={searchBarRef} className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Buscar por nombre del aeropuerto, ciudad o código..."
                        disabled={isLoading}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        className={cn(
                            'pl-12 bg-card! border-border text-foreground placeholder:text-muted-foreground',
                            compact ? 'h-10' : 'h-14'
                        )}
                    />

                    {showHistory && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                            <div className="py-2">
                                {searchHistory.map((term, index) => (
                                    <div
                                        key={index+term}
                                        className='group relative hover:bg-accent hover:text-accent-foreground'
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleHistoryClick(term)}
                                            className="w-full px-4 py-2 text-left text-sm text-foreground flex items-center justify-between group transition-colors"
                                        >
                                            <span className="flex items-center gap-3 line-clamp-1 truncate">
                                                <History className="w-4 h-4 text-muted-foreground shrink-0" />
                                                {term}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => handleRemoveHistory(e, term)}
                                            className="opacity-0 group-hover:opacity-100 bg-muted p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-opacity absolute right-2 top-1.5"
                                            aria-label="Eliminar del historial"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <AnimateIcon animateOnHover>
                    <Button
                        type="submit"
                        size={compact ? 'default' : 'default'}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground h-full sm:aspect-square cursor-pointer w-full sm:w-auto"
                    >
                        <Search />
                        <span className='flex sm:hidden'>Buscar</span>
                    </Button>
                </AnimateIcon>
            </div>
        </form>
    );
}
