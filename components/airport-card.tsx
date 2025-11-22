/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { MapPin, Plane, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Airport } from '@/types/airport';
import { useRouter } from 'next/navigation';

interface AirportCardProps {
    airport: Airport;
    index: number;
}

export function AirportCard({ airport, index }: AirportCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/airport/${airport.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: 'easeOut',
            }}
        >
            <Card
                className="p-0 bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                onClick={handleClick}
            >
                <CardContent className='p-6 z-10 w-full'>
                    <div className="flex flex-col gap-4 ">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance">
                                    {airport.airport_name}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">
                                        {airport.city_iata_code}, {airport.country_name}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-4 p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Plane className="w-5 h-5 text-primary" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">IATA</span>
                                <span className="font-mono font-semibold text-foreground">{airport.iata_code || 'N/A'}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">ICAO</span>
                                <span className="font-mono font-semibold text-foreground">{airport.icao_code || 'N/A'}</span>
                            </div>
                            {airport.timezone && (
                                <div className="flex flex-col ml-auto">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Timezone
                                    </span>
                                    <span className="text-xs font-medium text-foreground">{airport.timezone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>

                {/* Se comentarea esta línea para poder implementar dark mode */}
                {/* <div className='absolute z-0 inset-0 flex'>
                    <div className='flex-1'></div>
                    <div className='flex flex-1 bg-[url("/bg-2.png")] bg-cover bg-center '></div>
                </div>
                <div className='absolute inset-0 z-1 bg-black/85'></div> */}
            </Card>
        </motion.div>
    );
}
