'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAirportStore } from '@/store/airport-store';
import { cn } from '@/lib/utils';
import { AnimateIcon } from './animate-ui/icons/icon';
import { Search } from './animate-ui/icons/search';

interface SearchBarProps {
    onSearch?: () => void;
    compact?: boolean;
}

export function SearchBar({ onSearch, compact = false }: SearchBarProps) {
    const { searchQuery, setSearchQuery, isLoading, searchAirports } = useAirportStore()

    // Subit y prevencion de envio por defecto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await searchAirports(searchQuery);
        onSearch?.();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={cn('flex gap-3', compact ? 'flex-row' : 'flex-col sm:flex-row')}>
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Buscar por nombre del aeropuerto, ciudad o código..."
                        disabled={isLoading}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn(
                            'pl-12 bg-card! border-border text-foreground placeholder:text-muted-foreground',
                            compact ? 'h-10' : 'h-14'
                        )}
                    />
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
