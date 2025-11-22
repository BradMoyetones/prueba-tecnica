'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Globe, Info, MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAirportStore } from '@/store/airport-store';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Tabs, TabsPanel, TabsPanels, TabsList, TabsTab } from '@/components/animate-ui/components/base/tabs';
import { getLocalTime } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface AirportDetailsProps {
    airportId: string;
}

export function AirportDetails({ airportId }: AirportDetailsProps) {
    const router = useRouter();
    const { getAirportById } = useAirportStore();
    const airport = getAirportById(airportId);
    const {setTheme} = useTheme()

    useEffect(() => {
        // En caso de no encontrar el aeropuerto ir al Home
        if (!airport) {
            router.push('/');
        }
    }, [airport, router]);

    if (!airport) {
        return null;
    }

    // Paseamos a float
    const lat = parseFloat(airport.latitude);
    const lng = parseFloat(airport.longitude);
    const position: LatLngExpression = [lat, lng]; // Armamos el array tipado
    
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-6 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a buscar
                    </Button>

                    <div className="gap-6">
                        {/* Tabs para el muestreo de cada parte de la información */}
                        <Tabs defaultValue="general">
                            <TabsList>
                                <TabsTab value="general">General</TabsTab>
                                <TabsTab value="ubication">Ubicación</TabsTab>
                                <TabsTab value="timezone">Zona Horaria</TabsTab>
                                <TabsTab value="statistics">Estadísticas</TabsTab>
                            </TabsList>
                            <Card className="lg:col-span-3 p-8 border-border">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <motion.h1
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-2 bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent"
                                        >
                                            {airport.airport_name}
                                        </motion.h1>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex items-center gap-2 text-muted-foreground"
                                        >
                                            <MapPin className="w-5 h-5" />
                                            <span className="text-lg">
                                                {airport.city_iata_code}, {airport.country_name}
                                            </span>
                                        </motion.div>
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4, type: 'spring' }}
                                        className="p-4 rounded-2xl bg-primary/10"
                                    >
                                        <Plane className="w-8 h-8 text-primary" />
                                    </motion.div>
                                </div>
                                <TabsPanels>

                                    {/* Tab para datos generales */}
                                    <TabsPanel value="general">
                                        <div className='bg-muted/50 w-full mb-4 p-4 rounded-lg'>
                                            <div className='flex items-center gap-2'>
                                                <Info />
                                                <h1 className='text-xl font-bold bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent'>Información General</h1>
                                            </div>

                                            <motion.ul
                                                initial="hidden"
                                                animate="show"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: { staggerChildren: 0.12 },
                                                    },
                                                }}
                                                className="flex flex-col gap-1 mt-4"
                                            >
                                                {[
                                                    { title: 'IATA Code', desc: airport.iata_code || 'N/A' },
                                                    { title: 'ICAO Code', desc: airport.icao_code || 'N/A' },
                                                    { title: 'País', desc: airport.country_name || 'N/A' },
                                                    { title: 'Ciudad IATA', desc: airport.city_iata_code || 'N/A' },
                                                    { title: 'Teléfono', desc: airport.phone_number || 'N/A' },
                                                ].map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 20 },
                                                            show: { opacity: 1, y: 0 },
                                                        }}
                                                        className="p-1 rounded-lg"
                                                    >
                                                        <span className="font-semibold">{item.title}:</span>{' '}
                                                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        </div>
                                    </TabsPanel>

                                    {/* Tab para datos de ubicación */}
                                    <TabsPanel value="ubication">
                                        <div className='bg-muted/50 w-full mb-4 p-4 rounded-lg'>
                                            <div className='flex items-center gap-2'>
                                                <MapPin />
                                                <h1 className='text-xl font-bold bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent'>Ubicación</h1>
                                            </div>

                                            <motion.ul
                                                initial="hidden"
                                                animate="show"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: { staggerChildren: 0.12 },
                                                    },
                                                }}
                                                className="flex flex-col gap-1 mt-4"
                                            >
                                                {[
                                                    { title: 'Latitud', desc: airport.latitude || 'N/A' },
                                                    { title: 'Longitud', desc: airport.longitude || 'N/A' },
                                                    { title: 'ID Geoname', desc: airport.geoname_id || 'N/A' },
                                                ].map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 20 },
                                                            show: { opacity: 1, y: 0 },
                                                        }}
                                                        className="p-1 rounded-lg"
                                                    >
                                                        <span className="font-semibold">{item.title}:</span>{' '}
                                                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>

                                        </div>
                                        <div className='overflow-hidden rounded-lg border-8'>
                                            <MapContainer center={position}  zoom={13} scrollWheelZoom={true} className="h-96 w-full">
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={position}>
                                                    {/* Se comenta Popup para usar tooltip */}
                                                    {/* <Popup>
                                                        A pretty CSS3 popup. <br /> Easily customizable.
                                                    </Popup> */}
                                                    <Tooltip>Aeropuerto {airport.airport_name}.</Tooltip>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    </TabsPanel>

                                    {/* Tab para datos de la zona horaria */}
                                    <TabsPanel value="timezone">
                                        <div className='bg-muted/50 w-full mb-4 p-4 rounded-lg'>
                                            <div className='flex items-center gap-2'>
                                                <Globe />
                                                <h1 className='text-xl font-bold bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent'>Zona Horaria</h1>
                                            </div>

                                            <motion.ul
                                                initial="hidden"
                                                animate="show"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: { staggerChildren: 0.12 },
                                                    },
                                                }}
                                                className="flex flex-col gap-1 mt-4"
                                            >
                                                {[
                                                    { title: 'Zona Horaria', desc: airport.timezone || 'N/A' },
                                                    { title: 'GMT', desc: airport.gmt || 'N/A' },
                                                ].map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 20 },
                                                            show: { opacity: 1, y: 0 },
                                                        }}
                                                        className="p-1 rounded-lg"
                                                    >
                                                        <span className="font-semibold">{item.title}:</span>{' '}
                                                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        </div>
                                        <div className='bg-muted/50 w-full mb-4 p-4 rounded-lg'>
                                            <div className='flex items-center gap-2'>
                                                <Clock />
                                                <h1 className='text-xl font-bold bg-linear-to-r from-primary via-indigo-400 to-primary bg-clip-text text-transparent'>Hora Local</h1>
                                            </div>

                                            <motion.ul
                                                initial="hidden"
                                                animate="show"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: { staggerChildren: 0.12 },
                                                    },
                                                }}
                                                className="flex flex-col gap-1 mt-4"
                                            >
                                                {[
                                                    { title: 'Hora', desc: getLocalTime(airport.timezone) || 'N/A' },
                                                ].map((item, i) => (
                                                    <motion.li
                                                        key={i}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 20 },
                                                            show: { opacity: 1, y: 0 },
                                                        }}
                                                        className="p-1 rounded-lg"
                                                    >
                                                        <span className="font-semibold">{item.title}:</span>{' '}
                                                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                                                    </motion.li>
                                                ))}
                                            </motion.ul>

                                        </div>
                                    </TabsPanel>
                                    
                                    <TabsPanel value="statistics">
                                        Aqui irá toda la información de Estadísticas
                                    </TabsPanel>

                                </TabsPanels>
                            </Card>
                        </Tabs>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Este chip es un componente opcional para cada detalle o valor del aeropuerto
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chip = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className="p-4 rounded-lg bg-muted border border-border">
            <div className="text-xs text-muted-foreground mb-1">{title}</div>
            <div className="text-2xl font-bold font-mono text-foreground">{description}</div>
        </div>
    );
};
