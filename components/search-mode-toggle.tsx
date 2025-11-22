'use client';

import { Database, CloudDownload } from 'lucide-react';
import { Button } from './ui/button';
import type { SearchMode } from '@/types';
import { motion } from 'motion/react';

interface SearchModeToggleProps {
    mode: SearchMode;
    onModeChange: (mode: SearchMode) => void;
}

// Componente para cambiar de modo de busqueda - Se utiliza motion y layoutId para dar animación
export function SearchModeToggle({ mode, onModeChange }: SearchModeToggleProps) {
    return (
        <div className="flex items-center gap-2 rounded-full p-1">
            <Button
                size="sm"
                variant={mode === 'cached' ? 'default' : 'ghost'}
                onClick={() => onModeChange('cached')}
                className="relative rounded-full h-8 px-3"
            >
                {mode === 'cached' && (
                    <motion.div
                        layoutId="active-mode"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: 'spring', duration: 0.5 }}
                    />
                )}
                <Database className="w-4 h-4 mr-1.5 relative z-10" />
                <span className="text-xs relative z-10">Cache</span>
            </Button>
            <Button
                size="sm"
                variant={mode === 'api' ? 'default' : 'ghost'}
                onClick={() => onModeChange('api')}
                className="relative rounded-full h-8 px-3"
            >
                {mode === 'api' && (
                    <motion.div
                        layoutId="active-mode"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: 'spring', duration: 0.5 }}
                    />
                )}
                <CloudDownload className="w-4 h-4 mr-1.5 relative z-10" />
                <span className="text-xs relative z-10">API</span>
            </Button>
        </div>
    );
}
